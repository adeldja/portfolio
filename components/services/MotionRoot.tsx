"use client";

import { useEffect } from "react";
import { applyPaused, scrollToTarget, whenScrollIdle } from "./motion/store";

/**
 * Boots the motion layer of /services. Renders nothing.
 * GSAP and Lenis are only reached through a dynamic import, so they stay
 * out of the first-load JS.
 */
export default function MotionRoot() {
  // CSS scroll-behavior: smooth fights ScrollTrigger's scroll restoration and makes
  // touch scrolling jump, so in-page anchors are smoothed here instead.
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey ||
        document.documentElement.classList.contains("lenis")
      ) {
        return;
      }
      const link = (event.target as Element | null)?.closest("a[href^='#']");
      if (!(link instanceof HTMLAnchorElement)) {
        return;
      }
      const id = decodeURIComponent(link.hash.slice(1));
      const target = id ? document.getElementById(id) : null;
      if (!target) {
        return;
      }
      event.preventDefault();
      scrollToTarget(target);
      window.history.pushState(window.history.state, "", `#${id}`);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  useEffect(() => {
    const root = document.getElementById("sv-page");
    if (!root) {
      return;
    }
    const reduceQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    let generation = 0;
    let observer: IntersectionObserver | null = null;
    let cleanup: (() => void) | null = null;
    let cancelIdleWait: (() => void) | null = null;

    const stop = () => {
      generation += 1;
      cancelIdleWait?.();
      cancelIdleWait = null;
      observer?.disconnect();
      observer = null;
      cleanup?.();
      cleanup = null;
    };

    const start = () => {
      const current = ++generation;
      root.dataset.motion = "on";
      applyPaused();

      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            (entry.target as HTMLElement).dataset.inview = String(entry.isIntersecting);
          });
        },
        { rootMargin: "80px 0px" }
      );
      root.querySelectorAll<HTMLElement>("[data-loop]").forEach((element) => {
        observer?.observe(element);
      });

      // Download the engine right away, but only start it (and let ScrollTrigger
      // measure the page) once the page is loaded and the user isn't scrolling.
      import("./motion/engine")
        .then((engine) => {
          if (current !== generation || reduceQuery.matches) {
            return;
          }
          cancelIdleWait = whenScrollIdle(() => {
            cancelIdleWait = null;
            if (current !== generation || reduceQuery.matches) {
              return;
            }
            cleanup = engine.initMotion(root);
          });
        })
        .catch(() => {
          // Motion is an enhancement: the page is complete without it.
        });
    };

    const onChange = () => {
      stop();
      if (reduceQuery.matches) {
        root.dataset.motion = "reduced";
      } else {
        start();
      }
    };

    if (reduceQuery.matches) {
      root.dataset.motion = "reduced";
    } else {
      start();
    }
    reduceQuery.addEventListener("change", onChange);

    return () => {
      reduceQuery.removeEventListener("change", onChange);
      stop();
    };
  }, []);

  return null;
}
