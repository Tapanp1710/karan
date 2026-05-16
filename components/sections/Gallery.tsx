import { getData } from "@/lib/getData";
import GalleryClient from "./GalleryClient";
import styles from "./Gallery.module.css";

type GalleryData = typeof import("@/data/gallery.json");

export default async function Gallery() {
  const [gallery, siteData] = await Promise.all([
    getData<GalleryData>("gallery"),
    getData<typeof import("@/data/site.json")>("site"),
  ]);

  return (
    <section className={styles.section} id="gallery">
      <h2 className={`font-cormorant ${styles.heading}`}>{siteData.sectionTitles.gallery}</h2>
      <GalleryClient items={gallery} />
    </section>
  );
}
