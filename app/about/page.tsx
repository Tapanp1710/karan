import About from "@/components/sections/About";
import FadeInSection from "@/components/ui/FadeInSection";
import styles from "./page.module.css";

export default function AboutPage() {
  return (
    <div className={styles.page}>
      <FadeInSection>
        <About />
      </FadeInSection>
    </div>
  );
}
