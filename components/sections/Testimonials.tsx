import TestimonialCard from "@/components/ui/TestimonialCard";
import { getData } from "@/lib/getData";
import styles from "./Testimonials.module.css";

type TestimonialsData = typeof import("@/data/testimonials.json");

export default async function Testimonials() {
  const [testimonials, siteData] = await Promise.all([
    getData<TestimonialsData>("testimonials"),
    getData<typeof import("@/data/site.json")>("site"),
  ]);

  return (
    <section className={styles.section} id="testimonials">
      <h2 className={`font-cormorant ${styles.heading}`}>{siteData.sectionTitles.testimonials}</h2>
      <div className={styles.grid}>
        {testimonials.map((item) => (
          <TestimonialCard key={`${item.name}-${item.service}`} testimonial={item} />
        ))}
      </div>
    </section>
  );
}
