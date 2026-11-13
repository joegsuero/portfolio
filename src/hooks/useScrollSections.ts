import { actions } from "@/store/store";
import { createRef, useEffect, useMemo } from "react";

type SectionRefs<T extends readonly string[]> = {
  [K in T[number] as `${K}Ref`]: React.RefObject<HTMLDivElement>;
};

/**
 * Creates one ref per section and keeps `activeSection` in the store in sync
 * with the scroll position. Sections that aren't rendered are skipped.
 */
const useScrollSections = <T extends readonly string[]>(
  sections: T,
): SectionRefs<T> => {
  const refs = useMemo(
    () =>
      Object.fromEntries(
        sections.map((s) => [`${s}Ref`, createRef<HTMLDivElement>()]),
      ) as SectionRefs<T>,
    [sections],
  );

  useEffect(() => {
    const byName = refs as Record<string, React.RefObject<HTMLDivElement>>;
    const handleScroll = () => {
      const position = window.scrollY + 120;
      let active: string = sections[0];
      for (const section of sections) {
        const el = byName[`${section}Ref`]?.current;
        if (el && el.offsetTop <= position) active = section;
      }
      actions.setActiveSection(active);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sections, refs]);

  return refs;
};

export default useScrollSections;
