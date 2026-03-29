import Link from "next/link";
import { getData } from "@/lib/getData";
import styles from "./page.module.css";

type ServicesData = typeof import("@/data/services.json");

export const metadata = {
  title: "Our Services | Vathsalya CNNC",
  description: "Explore all 13 child development and therapy services offered at Vathsalya Child Neuro & Nurture Center.",
};

export default async function ServicesPage() {
  const services = await getData<ServicesData>("services");

  return (
    <main className={styles.page}>

      {/* ── Page hero ── */}
      <div className={styles.hero}>
        <p className={styles.eyebrow}>What We Offer</p>
        <h1 className={`font-cormorant ${styles.heading}`}>Our Clinical Services</h1>
        <p className={styles.subheading}>
          Comprehensive, evidence-based care for every child's unique journey — across 13 specialised therapy and diagnostic services.
        </p>
      </div>

      {/* ── Grid ── */}
      <div className={styles.grid}>
        {services.map((service) => (
          <Link
            key={service.id}
            href={`/services/${service.id}`}
            className={styles.card}
          >
            <div className={styles.cardTop}>
              <span className={styles.emoji}>{service.emoji}</span>
            </div>
            <div className={styles.cardBody}>
              <h2 className={`font-cormorant ${styles.title}`}>{service.title}</h2>
              <p className={styles.description}>{service.shortDescription}</p>
            </div>
            <div className={styles.cardFooter}>
              <span className={styles.cta}>Learn more →</span>
            </div>
          </Link>
        ))}
      </div>

      {/* ── Bottom CTA ── */}
      <div className={styles.bottomCta}>
        <p className={`font-cormorant ${styles.bottomCtaHeading}`}>
          Not sure where to start?
        </p>
        <p className={styles.bottomCtaText}>
          Book a consultation and our specialists will guide you to the right service for your child.
        </p>
        <a href="/#book" className={styles.bottomCtaButton}>
          Book a Free Consultation
        </a>
      </div>

    </main>
  );
}
