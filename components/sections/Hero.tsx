import { getData } from "@/lib/getData";
import styles from "./Hero.module.css";

type HeroData = typeof import("@/data/hero.json");

export default async function Hero() {
  const hero = await getData<HeroData>("hero");

  return (
    <section className={styles.section} id="home">
      <div className={styles.blob} />
      <div className={`leaf-float ${styles.leafOne}`}>🍃</div>
      <div className={`leaf-float-delayed ${styles.leafTwo}`}>🍃</div>

      <div className={styles.inner}>
        <div className={styles.content}>
          <p className={styles.eyebrow}>{hero.eyebrow}</p>
          <h1 className={`font-cormorant ${styles.heading}`}>
            {hero.headline}
          </h1>
          <p className={styles.subheadline}>{hero.subheadline}</p>
          <div className={styles.ctaRow}>
            <a
              href={hero.primaryButtonLink}
              className={styles.primaryButton}
            >
              {hero.primaryButtonText}
            </a>
            <a
              href={hero.secondaryButtonLink}
              className={styles.secondaryButton}
            >
              {hero.secondaryButtonText}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
