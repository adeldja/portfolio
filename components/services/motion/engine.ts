import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { registerLenis, whenScrollIdle } from "./store";

type Conditions = { motion: boolean; desktop: boolean; wide: boolean };

function isBelowFold(element: Element) {
  return element.getBoundingClientRect().top > window.innerHeight;
}

/**
 * All scroll-linked motion of /services. Reached only through a dynamic
 * import() from MotionRoot, so gsap / ScrollTrigger / lenis stay in an async chunk.
 * Returns a cleanup that reverts every tween, ScrollTrigger and Lenis.
 */
export function initMotion(root: HTMLElement): () => void {
  gsap.registerPlugin(ScrollTrigger);
  ScrollTrigger.config({ ignoreMobileResize: true });

  const all = <T extends HTMLElement = HTMLElement>(selector: string, scope: ParentNode = root) =>
    Array.from(scope.querySelectorAll<T>(selector));
  const one = <T extends HTMLElement = HTMLElement>(selector: string, scope: ParentNode = root) =>
    scope.querySelector<T>(selector);

  const mm = gsap.matchMedia();

  mm.add(
    {
      motion: "(prefers-reduced-motion: no-preference)",
      desktop: "(min-width: 900px) and (hover: hover) and (pointer: fine)",
      wide: "(min-width: 900px)",
    },
    (ctx) => {
      const { motion, desktop, wide } = ctx.conditions as Conditions;
      if (!motion) {
        return;
      }

      const disposers: Array<() => void> = [];
      let disposed = false;

      /* ---------- Smooth scroll (desktop pointer only) ---------- */
      if (desktop) {
        const lenis = new Lenis({ autoRaf: false, anchors: true, lerp: 0.1 });
        lenis.on("scroll", ScrollTrigger.update);
        const raf = (time: number) => lenis.raf(time * 1000);
        gsap.ticker.add(raf);
        gsap.ticker.lagSmoothing(0);
        registerLenis(lenis);
        disposers.push(() => {
          gsap.ticker.remove(raf);
          gsap.ticker.lagSmoothing(500, 33);
          lenis.destroy();
          registerLenis(null);
        });
      }

      /* ---------- Progress bar ---------- */
      const progress = one(".sv-progress");
      if (progress) {
        gsap.fromTo(
          progress,
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: "none",
            scrollTrigger: { trigger: root, start: "top top", end: "bottom bottom", scrub: true },
          }
        );
      }

      /* ---------- Hero: the sun rises ---------- */
      const hero = one(".sv-hero");
      const sun = one(".sv-sun");
      if (hero && sun) {
        const heroScroll = { trigger: hero, start: "top top", end: "bottom top", scrub: true };
        gsap.fromTo(
          sun,
          { yPercent: 0, scale: 1 },
          { yPercent: wide ? -18 : -12, scale: 1.15, ease: "none", scrollTrigger: heroScroll }
        );
        const content = one(".sv-hero-content");
        if (desktop && content) {
          gsap.fromTo(content, { y: 0 }, { y: -60, ease: "none", scrollTrigger: { ...heroScroll } });
        }
      }

      /* ---------- Marquee drift (desktop) ---------- */
      const band = one(".sv-marquee");
      if (desktop && band) {
        const bandScroll = { trigger: band, start: "top bottom", end: "bottom top", scrub: true };
        const row1 = one(".sv-marquee-row--1", band);
        const row2 = one(".sv-marquee-row--2", band);
        if (row1) {
          gsap.fromTo(row1, { xPercent: 0 }, { xPercent: -8, ease: "none", scrollTrigger: bandScroll });
        }
        if (row2) {
          gsap.fromTo(
            row2,
            { xPercent: 0 },
            { xPercent: 8, ease: "none", scrollTrigger: { ...bandScroll } }
          );
        }
      }

      /* ---------- Story: the storefront builds itself ---------- */
      const story = one(".sv-story");
      const stepsList = one(".sv-story-steps");
      const phone = one(".sv-phone");
      if (story && stepsList && phone) {
        story.classList.add("sv-story--live");
        disposers.push(() => story.classList.remove("sv-story--live"));

        const q = (selector: string) => all(selector, phone);
        const glow = one(".sv-phone-glow", story);
        const steps = all(".sv-story-step", story);

        const setActive = (index: number) => {
          steps.forEach((step, stepIndex) => step.classList.toggle("is-active", stepIndex === index));
        };
        const topmostCard = () => {
          let active = 0;
          steps.forEach((step, index) => {
            const card = one(".sv-story-card", step);
            if (card) {
              const rect = card.getBoundingClientRect();
              if (rect.top + rect.height / 2 < window.innerHeight) {
                active = index;
              }
            }
          });
          return active;
        };

        const tl = gsap.timeline({
          defaults: { ease: "power2.out" },
          scrollTrigger: {
            trigger: stepsList,
            start: "top 75%",
            end: wide ? "bottom 75%" : "bottom 85%",
            scrub: desktop ? 0.8 : true,
            invalidateOnRefresh: true,
            // Mobile: the captions stack, so the active one is the topmost card
            // that is at least half on screen.
            onUpdate: wide ? undefined : () => setActive(topmostCard()),
          },
        });

        // Segment 1: the search, then the site appears.
        tl.addLabel("search", 0)
          .fromTo(
            q(".sv-search-text"),
            { clipPath: "inset(0 100% 0 0)" },
            { clipPath: "inset(0 0% 0 0)", duration: 0.35, ease: "none" },
            0
          )
          .fromTo(q(".sv-result"), { y: 12, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.2 }, 0.35)
          .fromTo(
            q(".sv-layer-a"),
            { yPercent: 0, autoAlpha: 1 },
            { yPercent: -30, autoAlpha: 0, duration: 0.2, ease: "power1.in", immediateRender: true },
            0.6
          )
          .fromTo(q(".sv-site-header"), { yPercent: -100 }, { yPercent: 0, duration: 0.15 }, 0.65)
          .fromTo(
            q(".sv-site-hero"),
            { clipPath: "inset(100% 0% 0% 0%)" },
            { clipPath: "inset(0% 0% 0% 0%)", duration: 0.25, ease: "power2.inOut" },
            0.7
          )
          .fromTo(q(".sv-site-headline"), { y: 20, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.2 }, 0.8)
          .fromTo(
            q(".sv-site-pill"),
            { scale: 0.8, autoAlpha: 0 },
            { scale: 1, autoAlpha: 1, duration: 0.12, stagger: 0.04 },
            0.85
          );

        // Segment 2: the essentials.
        tl.addLabel("essentials", 1).fromTo(
          q(".sv-site-reveal"),
          { y: 24, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.4, stagger: 0.12 },
          1.1
        );
        if (glow) {
          tl.fromTo(glow, { autoAlpha: 0, scale: 0.6 }, { autoAlpha: 0.6, scale: 0.8, duration: 0.8, ease: "none" }, 1);
        }

        // Segment 3: the contact.
        tl.addLabel("contact", 2)
          .fromTo(
            q(".sv-screen-inner"),
            { y: 0 },
            {
              // Scroll the fake site just enough to bring the contact block into view.
              y: () => {
                const inner = one(".sv-screen-inner", phone);
                const screen = one(".sv-phone-screen", phone);
                if (!inner || !screen) {
                  return 0;
                }
                return -Math.max(0, inner.offsetTop + inner.offsetHeight - screen.clientHeight);
              },
              duration: 0.5,
              ease: "power1.inOut",
            },
            2
          )
          .fromTo(q(".sv-notif"), { yPercent: -130 }, { yPercent: 0, duration: 0.35, ease: "back.out(1.6)" }, 2.45)
          .fromTo(q(".sv-ring"), { scale: 1, opacity: 0.7 }, { scale: 1.7, opacity: 0, duration: 0.4, ease: "power1.out" }, 2.5);
        if (glow) {
          tl.to(glow, { autoAlpha: 1, scale: 1, duration: 0.5, ease: "none" }, 2.3);
        }
        tl.to({}, { duration: 0.01 }, 2.99);

        if (wide) {
          steps.forEach((step) => {
            ScrollTrigger.create({
              trigger: step,
              start: "top 65%",
              end: "bottom 65%",
              toggleClass: "is-active",
            });
          });
        } else {
          setActive(topmostCard());
        }

        if (desktop) {
          gsap.fromTo(
            phone,
            { rotate: -8, scale: 0.9, y: 60 },
            {
              rotate: 0,
              scale: 1,
              y: 0,
              ease: "none",
              scrollTrigger: { trigger: story, start: "top bottom", end: "top top", scrub: true },
            }
          );
        }
      }

      /* ---------- Titles: words rise from a mask ---------- */
      // On touch devices, below the story the page scrolls natively with no
      // scroll-triggered motion: tweens running during iOS momentum read as jumps.
      all("[data-reveal-title]").forEach((title) => {
        if (!isBelowFold(title) || (!desktop && !title.closest("#vitrine"))) {
          return;
        }
        gsap.fromTo(
          all(".sv-wi", title),
          { yPercent: 105 },
          {
            yPercent: 0,
            duration: 0.9,
            ease: "expo.out",
            stagger: 0.06,
            scrollTrigger: { trigger: title, start: "top 85%", once: true },
          }
        );
      });

      /* ---------- Block reveals ---------- */
      const reveals = desktop
        ? all("[data-reveal]").filter(
            (element) =>
              !(wide && element.dataset.reveal === "mobile") &&
              element.offsetParent !== null &&
              isBelowFold(element)
          )
        : [];
      if (reveals.length > 0) {
        gsap.set(reveals, { y: 24, autoAlpha: 0 });
        const onEnter = ctx.add("revealBatch", (batch: Element[]) => {
          gsap.to(batch, { y: 0, autoAlpha: 1, duration: 0.5, ease: "power2.out", stagger: 0.08, overwrite: true });
        }) as (batch: Element[]) => void;
        ScrollTrigger.batch(reveals, { start: "top 88%", once: true, onEnter: (batch) => onEnter(batch) });
      }

      /* ---------- Réalisations: names slide in (desktop) ---------- */
      if (desktop) {
        all(".sv-work-row").forEach((row) => {
          const name = one(".sv-work-name", row);
          if (!name) {
            return;
          }
          gsap.fromTo(
            name,
            { xPercent: 6 },
            {
              xPercent: 0,
              ease: "none",
              scrollTrigger: { trigger: row, start: "top bottom", end: "top 55%", scrub: true },
            }
          );
        });
      }

      /* ---------- Steps: the deck recedes ---------- */
      const stepList = one(".sv-steps");
      if (desktop && stepList) {
        const cards = all(".sv-step", stepList);
        const deck = gsap.timeline({
          scrollTrigger: { trigger: stepList, start: "top 15%", end: "bottom 60%", scrub: true },
        });
        cards.slice(0, -1).forEach((card, index) => {
          deck.fromTo(card, { scale: 1 }, { scale: 0.94, duration: 1, ease: "none" }, index);
        });
      }

      /* ---------- Offer spotlight (desktop pointer) ---------- */
      if (desktop) {
        all(".sv-offer").forEach((card) => {
          let frame = 0;
          let x = 0;
          let y = 0;
          const onMove = (event: PointerEvent) => {
            const rect = card.getBoundingClientRect();
            x = event.clientX - rect.left;
            y = event.clientY - rect.top;
            if (!frame) {
              frame = requestAnimationFrame(() => {
                frame = 0;
                card.style.setProperty("--mx", `${x}px`);
                card.style.setProperty("--my", `${y}px`);
              });
            }
          };
          const onLeave = () => {
            if (frame) {
              cancelAnimationFrame(frame);
              frame = 0;
            }
            card.style.removeProperty("--mx");
            card.style.removeProperty("--my");
          };
          card.addEventListener("pointermove", onMove);
          card.addEventListener("pointerleave", onLeave);
          disposers.push(() => {
            card.removeEventListener("pointermove", onMove);
            card.removeEventListener("pointerleave", onLeave);
            onLeave();
          });
        });
      }

      if (document.fonts && document.fonts.status !== "loaded") {
        document.fonts.ready.then(() => {
          if (!disposed) {
            disposers.push(whenScrollIdle(() => ScrollTrigger.refresh()));
          }
        });
      }

      return () => {
        disposed = true;
        disposers.forEach((dispose) => dispose());
      };
    }
  );

  return () => {
    mm.revert();
  };
}
