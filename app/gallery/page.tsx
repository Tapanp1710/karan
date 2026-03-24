import Gallery from "@/components/sections/Gallery";
import FadeInSection from "@/components/ui/FadeInSection";
import styles from "./page.module.css";

export default function GalleryPage() {
  return (
    <div className={styles.page}>
      <FadeInSection>
        <Gallery />
      </FadeInSection>
    </div>
  );
}
