import contactDataShape from "@/data/contact.json";
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
          <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2Zm0 1.8A3.95 3.95 0 0 0 3.8 7.75v8.5A3.95 3.95 0 0 0 7.75 20.2h8.5a3.95 3.95 0 0 0 3.95-3.95v-8.5a3.95 3.95 0 0 0-3.95-3.95h-8.5Zm9.35 1.35a1.15 1.15 0 1 1 0 2.3 1.15 1.15 0 0 1 0-2.3ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 1.8a3.2 3.2 0 1 0 0 6.4 3.2 3.2 0 0 0 0-6.4Z" />
        </svg>
      ) : null}
      {label === "facebook" ? (
        <svg viewBox="0 0 24 24" className={baseClass} aria-hidden="true">
          <path d="M13.2 22v-8.1h2.7l.5-3.2h-3.2V8.8c0-.9.3-1.6 1.7-1.6h1.8V4.3c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3v2.2H8.2v3.2h2.5V22h2.5Z" />
        </svg>
      ) : null}
      {label === "linkedin" ? (
        <svg viewBox="0 0 24 24" className={baseClass} aria-hidden="true">
          <path d="M4.9 3.5A1.9 1.9 0 1 1 4.9 7.3a1.9 1.9 0 0 1 0-3.8ZM3.3 8.8h3.2V21H3.3V8.8Zm5.2 0h3v1.7h.1c.4-.8 1.5-2 3.2-2 3.4 0 4 2.2 4 5V21h-3.2v-6.4c0-1.5 0-3.5-2.1-3.5-2.1 0-2.5 1.7-2.5 3.4V21H8.5V8.8Z" />
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
              alt="Vathsalya CNNC"
              width={120}
              height={45}
              style={{ objectFit: "contain" }}
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
