"use client";

import { createElement, useEffect, useRef, type ReactNode } from "react";

/**
 * One-shot reveals (WAAPI through motion/mini), started by an IntersectionObserver
 * (motion inView), both loaded on demand from ./runtime. Nothing is hidden on the server or without JS: on mount, only items
 * that are still below the fold are pre-hidden, then revealed once, and their inline
 * styles are cleared. Skipped entirely under prefers-reduced-motion.
 */

export type RevealPreset = "mask" | "rise" | "shutter";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const SELECTORS: Record<RevealPreset, string> = {
  mask: ".pd-mask-in",
  rise: "[data-rise]",
  shutter: "[data-shutter]",
};

const DURATIONS: Record<RevealPreset, number> = {
  mask: 0.75,
  rise: 0.9,
  shutter: 1.1,
};

function hide(preset: RevealPreset, el: HTMLElement) {
  if (preset === "mask") {
    el.style.transform = "translateY(105%)";
  } else if (preset === "rise") {
    el.style.opacity = "0";
    el.style.transform = "translateY(40px)";
  } else {
    el.style.clipPath = "inset(100% 0 0 0)";
    const img = el.querySelector<HTMLElement>("img");
    if (img) img.style.transform = "scale(1.08)";
  }
}

function clear(el: HTMLElement) {
  el.style.removeProperty("transform");
  el.style.removeProperty("opacity");
  el.style.removeProperty("clip-path");
  el.querySelector<HTMLElement>("img")?.style.removeProperty("transform");
}

export interface RevealGroupProps {
  preset: RevealPreset;
  /** Delay between items, in seconds. */
  stagger?: number;
  /** Share of the group that must be visible (capped so tall groups still trigger). */
  amount?: number;
  as?: string;
  className?: string;
  id?: string;
  tabIndex?: number;
  children: ReactNode;
}

export function RevealGroup({
  preset,
  stagger = 0.09,
  amount = 0.4,
  as = "div",
  className,
  id,
  tabIndex,
  children,
}: RevealGroupProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }
    const items = Array.from(root.querySelectorAll<HTMLElement>(SELECTORS[preset])).filter(
      (el) => el.getBoundingClientRect().top > window.innerHeight
    );
    if (items.length === 0) {
      return;
    }
    items.forEach((el) => hide(preset, el));

    const height = root.getBoundingClientRect().height || 1;
    const threshold = Math.max(0.01, Math.min(amount, (window.innerHeight * 0.6) / height));
    let cancelled = false;
    let stopObserving = () => {};
    const running: { stop: () => void }[] = [];

    import("./runtime").then(
      ({ inView, stagger: staggerDelay, animate }) => {
        if (cancelled) return;
        const opts = { duration: DURATIONS[preset], ease: EASE, delay: staggerDelay(stagger) };
        stopObserving = inView(
          root,
          () => {
            stopObserving();
            let anims: { finished: Promise<unknown>; stop: () => void }[] = [];
            if (preset === "mask") {
              anims = [animate(items, { transform: ["translateY(105%)", "translateY(0%)"] }, opts)];
            } else if (preset === "rise") {
              anims = [
                animate(
                  items,
                  { opacity: [0, 1], transform: ["translateY(40px)", "translateY(0px)"] },
                  opts
                ),
              ];
            } else {
              anims = [animate(items, { clipPath: ["inset(100% 0 0 0)", "inset(0% 0 0 0)"] }, opts)];
              const imgs = items
                .map((el) => el.querySelector<HTMLElement>("img"))
                .filter((img): img is HTMLElement => img !== null);
              if (imgs.length) {
                anims.push(animate(imgs, { transform: ["scale(1.08)", "scale(1)"] }, opts));
              }
            }
            running.push(...anims);
            Promise.all(anims.map((anim) => anim.finished)).then(
              () => {
                if (!cancelled) items.forEach(clear);
              },
              () => undefined
            );
          },
          { amount: threshold }
        );
      },
      // If the chunk cannot load, never leave content hidden.
      () => items.forEach(clear)
    );

    return () => {
      cancelled = true;
      stopObserving();
      running.forEach((anim) => anim.stop());
      items.forEach(clear);
    };
  }, [preset, stagger, amount]);

  return createElement(as, { ref, className, id, tabIndex }, children);
}
