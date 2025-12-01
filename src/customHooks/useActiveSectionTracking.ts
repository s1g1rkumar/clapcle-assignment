import { useState, useEffect, useRef, useCallback } from "react";
import type { SectionId } from "../pages/home";

const SECTION_IDS: SectionId[] = [
  "company",
  "contact",
  "address",
  "bank",
  "statutory",
  "credit",
];

const ROOT_MARGIN = "-25% 0px -70% 0px";

export function useActiveSectionTracking() {
  const [activeSection, setActiveSection] = useState<SectionId>(SECTION_IDS[0]);
  const suppressRef = useRef(false);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const activeSectionRef = useRef<SectionId>("company");

  useEffect(() => {
    activeSectionRef.current = activeSection;
  }, [activeSection]);

  const handleSidebarClick = useCallback((id: SectionId) => {
    const el = document.getElementById(id);
    if (!el) return;

    suppressRef.current = true;
    setActiveSection(id);

    el.scrollIntoView({ behavior: "smooth", block: "start" });

    const scrollTimeout = setTimeout(() => {
      suppressRef.current = false;
    }, 600);

    return () => clearTimeout(scrollTimeout);
  }, []);

  const observerCallback = useCallback<IntersectionObserverCallback>((entries) => {
    if (suppressRef.current) return;

    const intersecting = entries.filter((e) => e.isIntersecting);

    if (intersecting.length > 0) {
      const sortedEntries = intersecting.sort((a, b) => {
        return a.target.getBoundingClientRect().top - b.target.getBoundingClientRect().top;
      });

      const newId = sortedEntries[0].target.id as SectionId;

      if (newId !== activeSectionRef.current) {
        setActiveSection(newId);
      }
    }
  }, []);

  useEffect(() => {
    const rootEl = document.querySelector(".customer-container");
    if (!rootEl) return;

    const observer = new IntersectionObserver(observerCallback, {
      root: rootEl,
      rootMargin: ROOT_MARGIN,
      threshold: [0.01],
    });

    observerRef.current = observer;

    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [observerCallback]);

  return { activeSection, handleSidebarClick };
}