"use client";

import { useEffect } from "react";
import { applyPaused } from "./motion/store";

type IdleWindow = Window & {
  requestIdleCallback?: (callback: () => void, options?: { timeout: number }) => number;
  cancelIdleCallback?: (handle: number) => void;
};

/**
 * Boots the motion layer of /services. Renders nothing.
 * GSAP and Lenis are only reached through a dynamic import, so they stay
 * out of the first-load JS.
 */
export default function MotionRoot() {
  useEffect(() => {
    const root = document.getElementById("sv-page");
    if (!root) {
      return;
    }
    const win = window as IdleWindow;
    const reduceQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    let generation = 0;
    let idleHandle: number | null = null;
    let timeoutHandle: number | null = null;
    let observer: IntersectionObserver | null = null;
    let cleanup: (() => void) | null = null;

    const stop = () => {
      generation += 1;
      if (idleHandle !== null) {
        win.cancelIdleCallback?.(idleHandle);
        idleHandle = null;
      }
      if (timeoutHandle !== null) {
        window.clearTimeout(timeoutHandle);
        timeoutHandle = null;
      }
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

      const load = () => {
        idleHandle = null;
        timeoutHandle = null;
        import("./motion/engine")
          .then((engine) => {
            if (current !== generation || reduceQuery.matches) {
              return;
            }
            cleanup = engine.initMotion(root);
          })
          .catch(() => {
            // Motion is an enhancement: the page is complete without it.
          });
      };

      if (win.requestIdleCallback) {
        idleHandle = win.requestIdleCallback(load, { timeout: 1500 });
      } else {
        timeoutHandle = window.setTimeout(load, 200);
      }
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
