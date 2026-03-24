import Contact from "@/components/sections/Contact";
import FadeInSection from "@/components/ui/FadeInSection";
import styles from "./page.module.css";

export default function ContactPage() {
  return (
    <div className={styles.page}>
      <FadeInSection>
        <Contact />
      </FadeInSection>
    </div>
  );
}
