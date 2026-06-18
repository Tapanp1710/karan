import type { Metadata } from "next";
import EarlyLearningCentre from "@/components/sections/EarlyLearningCentre";
import FadeInSection from "@/components/ui/FadeInSection";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Early Learning Centre | Vathsalya CNNC",
  description:
    "Ankuram (Toddler Play Hub, 18\u201336 months) and Medha Vanam (30 months\u20136 years): warm, play-based early learning aligned to NCF-FS 2022 and NIPUN Bharat, in Nallagandla, Hyderabad.",
};

export default function EarlyLearningCentrePage() {
  return (
    <div className={styles.page}>
      <FadeInSection>
        <EarlyLearningCentre />
      </FadeInSection>
    </div>
  );
}
