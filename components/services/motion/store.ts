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

export function scrollToTarget(element: HTMLElement) {
  if (lenis) {
    lenis.scrollTo(element, { offset: 0 });
    return;
  }
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  element.scrollIntoView({ behavior: reduced ? "auto" : "smooth" });
}
