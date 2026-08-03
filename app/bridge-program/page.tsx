import type { Metadata } from "next";
import BridgeProgram from "@/components/sections/BridgeProgram";
import FadeInSection from "@/components/ui/FadeInSection";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "The Bridge Program | Vathsalya CT & ELC",
  description:
    "Individualised, assessment-led support for primary-grade children (Std I\u2013V) to close gaps in Math, Language and Social & Communication skills. Free NCF\u2013NIPUN skill-gap assessment, IEP per child, max 4 per cohort. Nallagandla, Hyderabad.",
};

export default function BridgeProgramPage() {
  return (
    <div className={styles.page}>
      <FadeInSection>
        <BridgeProgram />
      </FadeInSection>
    </div>
  );
}
