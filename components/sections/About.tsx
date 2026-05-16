import { getData } from "@/lib/getData";
import styles from "./About.module.css";

type AboutData = typeof import("@/data/about.json");

export default async function About() {
  const about = await getData<AboutData>("about");

  return (
    <section className={styles.section} id="about">
      <div className={styles.grid}>
        <div>
          <p className={styles.eyebrow}>{about.eyebrow}</p>
          <h2 className={`font-cormorant ${styles.heading}`}>{about.heading}</h2>
          <p className={styles.mission}>{about.mission}</p>
          <p className={styles.vision}>{about.vision}</p>

          <div className={styles.descriptionList}>
            {about.description.map((paragraph, index) => (
              <p key={`about-paragraph-${index}`}>{paragraph}</p>
            ))}
          </div>
        </div>

        <div className={styles.sidePanel}>
          <div className={styles.orb} />

          <div className={styles.sidePanelContent}>
            <h3 className={`font-cormorant ${styles.subheading}`}>{about.valuesHeading}</h3>
            <ul className={styles.valuesList}>
              {about.values.map((value) => (
                <li key={value.text} className={styles.valueItem}>
                  <span className={styles.valueIcon}>{value.icon}</span>
                  <span className={styles.valueText}>{value.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
