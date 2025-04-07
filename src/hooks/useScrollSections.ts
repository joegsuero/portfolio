/* eslint-disable @typescript-eslint/no-explicit-any */
import { actions } from "@/store/store";
import { createRef, useEffect } from "react";

type SectionRefs<T extends readonly string[]> = {
  [K in T[number] as `${K}Ref`]: React.RefObject<HTMLDivElement>;
};

const useScrollSections = <T extends readonly string[]>(
  sections: T
): SectionRefs<T> => {
  const refs = sections.reduce((acc, section) => {
    return {
      ...acc,
      [`${section}Ref`]: createRef<HTMLDivElement>(),
    };
  }, {} as SectionRefs<T>);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;
      let activeSection = sections[0];

      for (let i = 1; i < sections.length; i++) {
        const currentSection = sections[i];
        const currentRef = (refs as any)[`${currentSection}Ref`];

        if (
          currentRef.current &&
          scrollPosition >= currentRef.current.offsetTop &&
          (i === sections.length - 1 ||
            ((refs as any)[`${sections[i + 1]}Ref`]?.current &&
              scrollPosition <
                (refs as any)[`${sections[i + 1]}Ref`].current!.offsetTop))
        ) {
          activeSection = currentSection;
          break;
        }
      }

      actions.setActiveSection(activeSection);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sections]);

  return refs;
};

export default useScrollSections;
