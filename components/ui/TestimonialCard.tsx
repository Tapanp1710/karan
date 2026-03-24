type Testimonial = (typeof import("@/data/testimonials.json"))[number];
import styles from "./TestimonialCard.module.css";

type TestimonialCardProps = {
  testimonial: Testimonial;
};

export default function TestimonialCard({ testimonial }: TestimonialCardProps) {
  const stars = "★".repeat(Math.max(1, Math.min(5, testimonial.rating)));

  return (
    <article className={styles.card}>
      <p className={styles.stars}>{stars}</p>
      <p className={styles.quote}>&ldquo;{testimonial.quote}&rdquo;</p>
      <p className={styles.service}>{testimonial.service}</p>
      <p className={styles.author}>{testimonial.name} - Parent of {testimonial.childAge}</p>
    </article>
  );
}
