"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import styles from "./GalleryClient.module.css";

type GalleryItem = (typeof import("@/data/gallery.json"))[number];

type GalleryClientProps = {
  items: GalleryItem[];
  allFilterLabel: string;
};

export default function GalleryClient({ items, allFilterLabel }: GalleryClientProps) {
  const categories = useMemo(() => Array.from(new Set(items.map((item) => item.category))), [items]);
  const filters = useMemo(() => [allFilterLabel, ...categories], [allFilterLabel, categories]);
  const [activeFilter, setActiveFilter] = useState<string>(allFilterLabel);

  const filteredItems = useMemo(() => {
    if (activeFilter === allFilterLabel) {
      return items;
    }

    return items.filter((item) => item.category === activeFilter);
  }, [activeFilter, allFilterLabel, items]);

  return (
    <div className={styles.sectionBody}>
      <div className={styles.filters}>
        {filters.map((filter) => (
          <button
            key={filter}
            type="button"
            onClick={() => setActiveFilter(filter)}
            className={`${styles.filterButton} ${activeFilter === filter ? styles.filterButtonActive : styles.filterButtonInactive}`}
          >
            {filter}
          </button>
        ))}
      </div>

      <div className={styles.columns}>
        {filteredItems.map((item) => (
          <article
            key={item.id}
            className={styles.card}
          >
            <Image
              src={item.imagePath}
              alt={item.caption}
              width={800}
              height={550}
              className={styles.image}
            />
            <div className={styles.overlay}>
              <p className={styles.caption}>{item.caption}</p>
              <p className={styles.category}>{item.category}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
