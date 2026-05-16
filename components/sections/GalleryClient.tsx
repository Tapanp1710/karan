"use client";

import Image from "next/image";
import styles from "./GalleryClient.module.css";

type GalleryItem = (typeof import("@/data/gallery.json"))[number];

type GalleryClientProps = {
  items: GalleryItem[];
};

export default function GalleryClient({ items }: GalleryClientProps) {
  return (
    <div className={styles.sectionBody}>
      <div className={styles.columns}>
        {items.map((item) => (
          <article key={item.id} className={styles.card}>
            <Image
              src={item.imagePath}
              alt={`Gallery image ${item.id}`}
              width={800}
              height={550}
              className={styles.image}
            />
          </article>
        ))}
      </div>
    </div>
  );
}
