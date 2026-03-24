"use client";

import { useRef } from "react";
import { useInView } from "@/hooks/useInView";
import styles from "./FadeInSection.module.css";

type FadeInSectionProps = {
  children: React.ReactNode;
};

export default function FadeInSection({ children }: FadeInSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });

  return (
    <div ref={sectionRef} className={`${styles.section} reveal-section ${isInView ? "is-visible" : ""}`}>
      {children}
    </div>
  );
}
