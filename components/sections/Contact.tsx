import { getData } from "@/lib/getData";
import styles from "./Contact.module.css";

type ContactData = typeof import("@/data/contact.json");

type SocialIconProps = {
  href: string;
  label: "instagram" | "facebook" | "linkedin";
};

const SOCIAL_LABELS = ["instagram", "facebook", "linkedin"] as const;

function SocialIcon({ href, label }: SocialIconProps) {
  const className = styles.socialIcon;

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      className={styles.socialButton}
    >
      {label === "instagram" ? (
        <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
          <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2Zm0 1.8A3.95 3.95 0 0 0 3.8 7.75v8.5A3.95 3.95 0 0 0 7.75 20.2h8.5a3.95 3.95 0 0 0 3.95-3.95v-8.5a3.95 3.95 0 0 0-3.95-3.95h-8.5Zm9.35 1.35a1.15 1.15 0 1 1 0 2.3 1.15 1.15 0 0 1 0-2.3ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 1.8a3.2 3.2 0 1 0 0 6.4 3.2 3.2 0 0 0 0-6.4Z" />
        </svg>
      ) : null}
      {label === "facebook" ? (
        <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
          <path d="M13.2 22v-8.1h2.7l.5-3.2h-3.2V8.8c0-.9.3-1.6 1.7-1.6h1.8V4.3c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3v2.2H8.2v3.2h2.5V22h2.5Z" />
        </svg>
      ) : null}
      {label === "linkedin" ? (
        <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
          <path d="M4.9 3.5A1.9 1.9 0 1 1 4.9 7.3a1.9 1.9 0 0 1 0-3.8ZM3.3 8.8h3.2V21H3.3V8.8Zm5.2 0h3v1.7h.1c.4-.8 1.5-2 3.2-2 3.4 0 4 2.2 4 5V21h-3.2v-6.4c0-1.5 0-3.5-2.1-3.5-2.1 0-2.5 1.7-2.5 3.4V21H8.5V8.8Z" />
        </svg>
      ) : null}
    </a>
  );
}

export default async function Contact() {
  const contact = await getData<ContactData>("contact");

  return (
    <section className={styles.section} id="contact">
      <h2 className={`font-cormorant ${styles.heading}`}>{contact.sectionTitle}</h2>

      <div className={styles.grid}>
        <div className={styles.infoCard}>
          <ul className={styles.infoList}>
            <li>
              <p className={styles.label}>{contact.labels.address}</p>
              <p>{contact.address}</p>
            </li>
            <li>
              <p className={styles.label}>{contact.labels.phone}</p>
              <a href={`tel:${contact.phone}`}>{contact.phone}</a>
            </li>
            <li>
              <p className={styles.label}>{contact.labels.email}</p>
              <a href={`mailto:${contact.email}`}>{contact.email}</a>
            </li>
            <li>
              <p className={styles.label}>{contact.labels.businessHours}</p>
              <ul className={styles.hoursList}>
                {contact.businessHours.map((hour) => (
                  <li key={hour}>{hour}</li>
                ))}
              </ul>
            </li>
          </ul>

          <div className={styles.socialRow}>
            {SOCIAL_LABELS.map((label) => (
              <SocialIcon key={label} href={contact.socialLinks[label]} label={label} />
            ))}
          </div>
        </div>

        <div className={styles.mapCard}>
          <iframe
            title={contact.labels.mapTitle}
            src={contact.mapEmbedUrl}
            className={styles.mapFrame}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
}
