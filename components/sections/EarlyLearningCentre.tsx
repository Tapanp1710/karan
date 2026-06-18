import Image from "next/image";
import { getData } from "@/lib/getData";
import EarlyLearningCentreClient from "./EarlyLearningCentreClient";
import styles from "./EarlyLearningCentre.module.css";

type ELCData = typeof import("@/data/early-learning-centre.json");

export default async function EarlyLearningCentre() {
  const elc = await getData<ELCData>("early-learning-centre");

  return (
    <section className={styles.section} id="early-learning-centre">
      <header className={styles.intro}>
        <p className={styles.eyebrow}>{elc.eyebrow}</p>
        <h1 className={`font-cormorant ${styles.heading}`}>{elc.heading}</h1>
        <p className={styles.lede}>{elc.intro}</p>
        <p className={styles.reassure}>{elc.reassure}</p>
      </header>

      {/* Two programmes */}
      <h2 className={`font-cormorant ${styles.blockHeading}`}>{elc.programmesHeading}</h2>
      <div className={styles.programmes}>
        {elc.programmes.map((p) => (
          <article key={p.name} className={styles.programmeCard}>
            <div className={styles.programmeLogoWrap}>
              <Image
                src={p.logo}
                alt={p.logoAlt}
                width={440}
                height={440}
                className={styles.programmeLogo}
              />
            </div>
            <h3 className={styles.srOnly}>{p.name}</h3>
            <div className={styles.programmeMeta}>
              <span className={styles.programmeSubtitle}>{p.subtitle}</span>
              <span className={styles.agePill}>{p.age}</span>
            </div>
            <p className={styles.programmeDesc}>{p.description}</p>
          </article>
        ))}
      </div>

      {/* Interactive "what your child grows toward" */}
      <h2 className={`font-cormorant ${styles.blockHeading}`}>{elc.journeyHeading}</h2>
      <EarlyLearningCentreClient
        stages={elc.stages}
        alignmentNote={elc.alignmentNote}
        ctaLabel={elc.ctaLabel}
      />

      {/* Admissions / 30-month logic */}
      <div className={styles.admissions}>
        <h2 className={`font-cormorant ${styles.admissionsHeading}`}>{elc.admissions.heading}</h2>
        {elc.admissions.body.map((para, i) => (
          <p key={`adm-${i}`} className={styles.admissionsPara}>{para}</p>
        ))}
        <p className={styles.admissionsNote}>{elc.admissions.note}</p>
      </div>
    </section>
  );
}
