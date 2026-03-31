type Service = (typeof import("@/data/services.json"))[number];
import styles from "./ServiceCard.module.css";

type ServiceCardProps = {
  service: Service;
};

export default function ServiceCard({ service }: ServiceCardProps) {
  return (
    <article className={styles.card}>
      <p className={`material-symbols-rounded ${styles.emoji}`}>{service.emoji}</p>
      <h3 className={`font-cormorant ${styles.title}`}>{service.title}</h3>
      <p className={styles.description}>{service.shortDescription}</p>
    </article>
  );
}
