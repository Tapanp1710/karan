import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import Team from "@/components/sections/Team";
import Testimonials from "@/components/sections/Testimonials";
import FadeInSection from "@/components/ui/FadeInSection";
import WaveDivider from "@/components/ui/WaveDivider";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <FadeInSection>
        <Hero />
      </FadeInSection>
      <WaveDivider />
      <FadeInSection>
        <Services />
      </FadeInSection>
      <WaveDivider />
      <FadeInSection>
        <Team />
      </FadeInSection>
      <FadeInSection>
        <Testimonials />
      </FadeInSection>
    </div>
  );
}
