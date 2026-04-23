type Service = (typeof import("@/data/services.json"))[number];
import DynamicIcon from "./DynamicIcon";
import styles from "./ServiceCard.module.css";

type ServiceCardProps = {
  service: Service;
};

export default function ServiceCard({ service }: ServiceCardProps) {
  return (
    <article className={styles.card}>
      <div className={styles.emoji}>
        <DynamicIcon name={service.emoji} size={28} color="var(--color-ink)" />
      </div>
      <h3 className={`font-cormorant ${styles.title}`}>{service.title}</h3>
      <p className={styles.description}>{service.shortDescription}</p>
    </article>
  );
}
