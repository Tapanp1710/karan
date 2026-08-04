"use client";

import contactDataShape from "@/data/contact.json";
import servicesDataShape from "@/data/services.json";
import siteDataShape from "@/data/site.json";
import Image from "next/image";
import FooterLegal from "./FooterLegal";
import styles from "./Footer.module.css";

type SiteData = typeof siteDataShape;
type ContactData = typeof contactDataShape;

type FooterProps = {
  siteData: SiteData;
  contactData: ContactData;
};

type SocialLinkProps = {
  href: string;
  label: "instagram" | "facebook" | "linkedin";
};

const SOCIAL_LABELS = ["instagram", "facebook", "linkedin"] as const;

function SocialIcon({ href, label }: SocialLinkProps) {
  const baseClass = styles.socialIconSvg;

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      className={styles.socialIconLink}
    >
      {label === "instagram" ? (
        <svg viewBox="0 0 24 24" className={baseClass} aria-hidden="true">
          <rect x="3" y="3" width="18" height="18" rx="5" ry="5" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="12" cy="12" r="3" fill="currentColor" />
          <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" />
        </svg>
      ) : null}
      {label === "facebook" ? (
        <svg viewBox="0 0 24 24" className={baseClass} aria-hidden="true">
          <path d="M14.5 8H12V6.2c0-.6.4-.8.8-.8h1.2V3.2S13.8 3 12.7 3C10.8 3 9.5 4 9.5 6.1V8H7v2.9h2.5V21h3V10.9H16l.5-2.9h-2z" fill="currentColor" />
        </svg>
      ) : null}
      {label === "linkedin" ? (
        <svg viewBox="0 0 24 24" className={baseClass} aria-hidden="true">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" fill="none" stroke="currentColor" strokeWidth="1.2" />
          <path d="M8.5 10.5v7H6V10.5h2.5zm-1.3-3a1.2 1.2 0 110-2.4 1.2 1.2 0 010 2.4zM12 10.5v7h2.5v-3.6c0-1.9 2.5-2.1 2.5 0V17.5H20v-4.6c0-4.1-4.4-3.9-5.5-1.9V10.5H12z" fill="currentColor" />
        </svg>
      ) : null}
    </a>
  );
}

export default function Footer({ siteData, contactData }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.grid}>
        <div>
          <div className={`font-cormorant ${styles.brand}`}>
            <Image
              src="/logo.png"
              alt="Vathsalya CT & ELC"
              width={120}
              height={45}
              style={{ objectFit: "contain", width: "auto", height: "auto" }}
            />
          </div>
          <p className={styles.tagline}>{siteData.tagline}</p>
        </div>

        <div>
          <h4 className={`font-cormorant ${styles.sectionHeading}`}>{siteData.footer.quickLinksTitle}</h4>
          <ul className={styles.infoList}>
            {siteData.navLinks.map((link) => (
              <li key={`footer-${link.label}`}>
                <a href={link.href} className={styles.inlineLink}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className={`font-cormorant ${styles.sectionHeading}`}>{siteData.footer.contactTitle}</h4>
          <ul className={styles.infoList}>
            <li>{contactData.address}</li>
            <li>
              <a href={`tel:${contactData.phone}`} className={styles.inlineLink}>{contactData.phone}</a>
            </li>
            <li>
              <a href={`mailto:${contactData.email}`} className={styles.inlineLink}>{contactData.email}</a>
            </li>
            <li>
              <a
                href={`https://wa.me/${siteData.whatsAppNumber.replace(/\D/g, "")}`}
                target="_blank"
                rel="noreferrer"
                className={styles.inlineLink}
              >
                {siteData.footer.whatsAppCtaLabel}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className={`font-cormorant ${styles.sectionHeading}`}>{siteData.footer.followTitle}</h4>
          <div className={styles.socialRow}>
            {SOCIAL_LABELS.map((label) => (
              <SocialIcon key={label} href={contactData.socialLinks[label]} label={label} />
            ))}
          </div>
        </div>
      </div>

      <FooterLegal />

      <div className={styles.bottomBar}>
        <p>© {currentYear} {siteData.clinicName}. {siteData.footer.copyrightLine}</p>
      </div>
    </footer>
  );
}
