import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Scrolls to the top on every route change, or to a home section when the
 * navigation carries `state.scrollTo` (e.g. clicking "Contact" from /projects).
 */
export default function ScrollManager() {
  const { pathname, state } = useLocation();
  const scrollTo: string | undefined = state?.scrollTo;

  useEffect(() => {
    if (scrollTo) {
      // Wait one frame so the target page has rendered its sections
      const id = requestAnimationFrame(() =>
        document.getElementById(scrollTo)?.scrollIntoView({ behavior: "smooth" }),
      );
      return () => cancelAnimationFrame(id);
    }
    window.scrollTo({ top: 0 });
  }, [pathname, scrollTo]);

  return null;
}
