import type Lenis from "lenis";

const STORAGE_KEY = "sv-motion-paused";

let paused = false;
let loaded = false;
let lenis: Lenis | null = null;
const listeners = new Set<() => void>();

function load() {
  if (loaded || typeof window === "undefined") {
    return;
  }
  loaded = true;
  try {
    paused = window.localStorage.getItem(STORAGE_KEY) === "true";
  } catch {
    paused = false;
  }
}

export function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function getPaused(): boolean {
  load();
  return paused;
}

export function getServerPaused(): boolean {
  return false;
}

/** Writes the current paused state on #sv-page[data-paused]. */
export function applyPaused() {
  document.getElementById("sv-page")?.setAttribute("data-paused", String(getPaused()));
}

export function setPaused(value: boolean) {
  load();
  paused = value;
  try {
    window.localStorage.setItem(STORAGE_KEY, String(value));
  } catch {
    // Storage unavailable (private mode, quota): keep the in-memory value.
  }
  applyPaused();
  listeners.forEach((listener) => listener());
}

export function registerLenis(instance: Lenis | null) {
  lenis = instance;
}

/**
 * Runs `callback` once the page has finished loading and the user is not
 * scrolling (no finger down, no scroll event for `quiet` ms). ScrollTrigger
 * measures by jumping to the top and back; doing that mid-gesture breaks iOS
 * momentum scrolling and makes the page jump. Returns a cancel function.
 */
export function whenScrollIdle(callback: () => void, quiet = 220): () => void {
  let timer = 0;
  let touching = false;
  let cancelled = false;

  const arm = () => {
    window.clearTimeout(timer);
    if (!touching && document.readyState === "complete") {
      timer = window.setTimeout(done, quiet);
    }
  };
  const onTouchStart = () => {
    touching = true;
    window.clearTimeout(timer);
  };
  const onTouchEnd = () => {
    touching = false;
    arm();
  };
  const cancel = () => {
    cancelled = true;
    window.clearTimeout(timer);
    window.removeEventListener("scroll", arm);
    window.removeEventListener("load", arm);
    window.removeEventListener("touchstart", onTouchStart);
    window.removeEventListener("touchend", onTouchEnd);
    window.removeEventListener("touchcancel", onTouchEnd);
  };
  const done = () => {
    if (cancelled) {
      return;
    }
    cancel();
    callback();
  };

  window.addEventListener("scroll", arm, { passive: true });
  window.addEventListener("load", arm);
  window.addEventListener("touchstart", onTouchStart, { passive: true });
  window.addEventListener("touchend", onTouchEnd, { passive: true });
  window.addEventListener("touchcancel", onTouchEnd, { passive: true });
  arm();
  return cancel;
}

export function scrollToTarget(element: HTMLElement) {
  if (lenis) {
    lenis.scrollTo(element, { offset: 0 });
    return;
  }
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  element.scrollIntoView({ behavior: reduced ? "auto" : "smooth" });
}
