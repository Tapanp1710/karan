import ServicesCarousel from "@/components/sections/ServicesCarousel";
import { getData } from "@/lib/getData";
import styles from "./Services.module.css";

type ServicesData = typeof import("@/data/services.json");

export default async function Services() {
  const [services, siteData] = await Promise.all([
    getData<ServicesData>("services"),
    getData<typeof import("@/data/site.json")>("site"),
  ]);

  return (
    <section className={styles.section} id="services" aria-label={siteData.sectionTitles.services}>
      <ServicesCarousel services={services} />
    </section>
  );
}
