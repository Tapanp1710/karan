import { notFound } from "next/navigation";
import Link from "next/link";
import { getData } from "@/lib/getData";
import DynamicIcon from "@/components/ui/DynamicIcon";
import BookingButton from "@/components/ui/BookingButton";
import styles from "./page.module.css";

type ServicesData = typeof import("@/data/services.json");
type Service = ServicesData[number];

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateStaticParams() {
  const services = await getData<ServicesData>("services");
  return services.map((s) => ({ id: s.id }));
}

export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  const services = await getData<ServicesData>("services");
  const service = services.find((s) => s.id === id);
  if (!service) return {};
  return {
    title: `${service.title} | Vathsalya CNNC`,
    description: service.shortDescription,
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { id } = await params;
  const services = await getData<ServicesData>("services");
  const service = services.find((s) => s.id === id);

  if (!service) {
    notFound();
    return null;
  }

  const s = service as Service;

  // Related: filter out current, pick up to 3
  const related = services.filter((r) => r.id !== s.id).slice(0, 3);

  return (
    <main className={styles.page}>

      {/* ── Breadcrumb ── */}
      <nav className={styles.breadcrumb} aria-label="Breadcrumb">
        <Link href="/" className={styles.breadcrumbLink}>Home</Link>
        <span className={styles.breadcrumbSep}>/</span>
        <Link href="/services" className={styles.breadcrumbLink}>Services</Link>
        <span className={styles.breadcrumbSep}>/</span>
        <span className={styles.breadcrumbCurrent}>{s.title}</span>
      </nav>

      {/* ── Hero ── */}
      <header className={styles.hero}>
        <div className={styles.heroInner}>
          <div className={styles.heroEmoji}>
            <DynamicIcon name={s.emoji} size={48} color="var(--color-peach)" />
          </div>
          <div>
            <h1 className={`font-cormorant ${styles.heroTitle}`}>{s.title}</h1>
            <p className={styles.heroShort}>{s.shortDescription}</p>
          </div>
        </div>
      </header>

      {/* ── Key highlights row ── */}
      {"keyPoints" in s && Array.isArray(s.keyPoints) && s.keyPoints.length > 0 && (
        <div className={styles.keyPoints}>
          {(s.keyPoints as { icon: string; label: string }[]).map((kp, i) => (
            <div key={i} className={styles.keyPoint}>
              <DynamicIcon name={kp.icon} size={24} color="var(--color-ink)" />
              <span className={styles.keyPointLabel}>{kp.label}</span>
            </div>
          ))}
        </div>
      )}

      {/* ── Two-column content ── */}
      <div className={styles.contentGrid}>

        {/* Left – About + What to Expect */}
        <div className={styles.mainCol}>
          <section className={styles.section}>
            <h2 className={`font-cormorant ${styles.sectionHeading}`}>About This Service</h2>
            <p className={styles.bodyText}>{s.fullDescription}</p>
          </section>

          {"whatToExpect" in s && s.whatToExpect && (
            <section className={styles.section}>
              <h2 className={`font-cormorant ${styles.sectionHeading}`}>What to Expect</h2>
              <p className={styles.bodyText}>{s.whatToExpect as string}</p>
            </section>
          )}

          {"whoItHelps" in s && s.whoItHelps && (
            <section className={styles.section}>
              <h2 className={`font-cormorant ${styles.sectionHeading}`}>Who It Helps</h2>
              <p className={styles.bodyText}>{s.whoItHelps as string}</p>
            </section>
          )}
        </div>

        {/* Right – Benefits + Conditions */}
        <aside className={styles.sideCol}>

          {"benefits" in s && Array.isArray(s.benefits) && s.benefits.length > 0 && (
            <div className={styles.sideCard}>
              <h3 className={`font-cormorant ${styles.sideCardHeading}`}>Key Benefits</h3>
              <ul className={styles.benefitsList}>
                {(s.benefits as string[]).map((b, i) => (
                  <li key={i} className={styles.benefitItem}>
                    <span className={styles.benefitCheck}>✓</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {"conditions" in s && Array.isArray(s.conditions) && s.conditions.length > 0 && (
            <div className={styles.sideCard}>
              <h3 className={`font-cormorant ${styles.sideCardHeading}`}>Conditions We Address</h3>
              <div className={styles.conditionTags}>
                {(s.conditions as string[]).map((c, i) => (
                  <span key={i} className={styles.conditionTag}>{c}</span>
                ))}
              </div>
            </div>
          )}

          {/* Sticky CTA inside sidebar */}
          <div className={styles.sideCta}>
            <p className={`font-cormorant ${styles.sideCtaHeading}`}>Book a Session</p>
            <p className={styles.sideCtaText}>Ready to take the next step? Book a consultation with our specialists today.</p>
            <BookingButton className={styles.sideCtaButton}>Book Appointment</BookingButton>
            <a href="/services" className={styles.sideCtaSecondary}>← All Services</a>
          </div>

        </aside>
      </div>

      {/* ── Full-width CTA banner ── */}
      <div className={styles.ctaBanner}>
        <div className={styles.ctaBannerInner}>
          <p className={`font-cormorant ${styles.ctaHeading}`}>Every Child Deserves the Right Support</p>
          <p className={styles.ctaSub}>
            Our multidisciplinary team is ready to assess, guide, and support your child&apos;s unique journey.
          </p>
          <div className={styles.ctaButtons}>
            <BookingButton className={styles.ctaButtonPrimary}>Book an Appointment</BookingButton>
            <a href="/contact" className={styles.ctaButtonSecondary}>Get in Touch</a>
          </div>
        </div>
      </div>

      {/* ── Related services ── */}
      {related.length > 0 && (
        <section className={styles.relatedSection}>
          <h2 className={`font-cormorant ${styles.relatedHeading}`}>You Might Also Be Interested In</h2>
          <div className={styles.relatedGrid}>
            {related.map((rel) => (
              <Link key={rel.id} href={`/services/${rel.id}`} className={styles.relatedCard}>
                <div className={styles.relatedEmoji}>
                  <DynamicIcon name={rel.emoji} size={28} color="var(--color-peach)" />
                </div>
                <h3 className={`font-cormorant ${styles.relatedTitle}`}>{rel.title}</h3>
                <p className={styles.relatedDesc}>{rel.shortDescription}</p>
                <span className={styles.relatedCta}>Learn more →</span>
              </Link>
            ))}
          </div>
          <div className={styles.allServicesLink}>
            <Link href="/services">View all 13 services →</Link>
          </div>
        </section>
      )}

    </main>
  );
}
