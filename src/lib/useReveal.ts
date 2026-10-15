import { useEffect } from "react";

/**
 * Fades and slides in every [data-reveal] element as it scrolls into view.
 * The attribute value is a delay in ms. Anything already on screen is shown after
 * ~1s even if the observer never fires, so content can't get stuck invisible.
 */
export function useReveal(deps: unknown[], reduced: boolean) {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]:not([data-rv])"));
    if (reduced) {
      els.forEach((el) => (el.dataset.rv = "1"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((en) => {
          if (!en.isIntersecting) return;
          const el = en.target as HTMLElement;
          el.style.opacity = "1";
          el.style.transform = "none";
          io.unobserve(el);
        }),
      { threshold: 0.1 },
    );
    els.forEach((el) => {
      el.dataset.rv = "1";
      const d = Number(el.dataset.reveal) || 0;
      el.style.opacity = "0";
      el.style.transform = "translateY(16px)";
      el.style.transition = `opacity .6s ease ${d}ms, transform .8s cubic-bezier(.2,.7,.2,1) ${d}ms`;
      io.observe(el);
    });
    const fallback = window.setTimeout(() => {
      els.forEach((el) => {
        const b = el.getBoundingClientRect();
        if (b.top < window.innerHeight && b.bottom > 0) {
          el.style.opacity = "1";
          el.style.transform = "none";
        }
      });
    }, 900);
    return () => {
      io.disconnect();
      window.clearTimeout(fallback);
      // Elements still waiting get shown so nothing stays hidden after a re-render.
      els.forEach((el) => {
        el.style.opacity = "";
        el.style.transform = "";
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps, reduced]);
}
