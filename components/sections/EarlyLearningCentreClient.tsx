"use client";

import { useState, type KeyboardEvent } from "react";
import {
  Activity,
  Heart,
  Lightbulb,
  MessageCircle,
  Palette,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { useBooking } from "@/context/BookingContext";
import styles from "./EarlyLearningCentre.module.css";

type Card = { icon: string; title: string; points: string[] };
type Stage = { id: string; name: string; age: string; tag: string; cards: Card[] };

type Props = {
  stages: readonly Stage[];
  alignmentNote: string;
  ctaLabel: string;
  bookingTitle?: string;
  serviceLabel?: string;
  serviceOptions?: string[];
};

const ICONS: Record<string, LucideIcon> = {
  body: Activity,
  feelings: Heart,
  thinking: Lightbulb,
  language: MessageCircle,
  creativity: Palette,
  habits: Sparkles,
};

export default function EarlyLearningCentreClient({
  stages,
  alignmentNote,
  ctaLabel,
  bookingTitle,
  serviceLabel,
  serviceOptions,
}: Props) {
  const [active, setActive] = useState(0);
  const { openBooking } = useBooking();
  const stage = stages[active];

  const onKeyDown = (e: KeyboardEvent, index: number) => {
    if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
      e.preventDefault();
      const next =
        (index + (e.key === "ArrowRight" ? 1 : stages.length - 1)) % stages.length;
      setActive(next);
      const el = document.getElementById(`elc-tab-${next}`);
      el?.focus();
    }
  };

  return (
    <div className={styles.journey}>
      <div className={styles.tablist} role="tablist" aria-label="Choose a stage">
        {stages.map((s, i) => (
          <button
            key={s.id}
            id={`elc-tab-${i}`}
            role="tab"
            type="button"
            aria-selected={i === active}
            aria-controls="elc-panel"
            className={`${styles.tab} ${i === active ? styles.tabActive : ""}`}
            onClick={() => setActive(i)}
            onKeyDown={(e) => onKeyDown(e, i)}
          >
            <span className={styles.tabName}>{s.name}</span>
            <span className={styles.tabAge}>{s.age}</span>
          </button>
        ))}
      </div>

      <div id="elc-panel" role="tabpanel" tabIndex={0} className={styles.panel}>
        <div className={styles.panelHead}>
          <span className={`font-cormorant ${styles.panelName}`}>{stage.name}</span>
          <span className={styles.panelTag}>{stage.tag}</span>
        </div>

        <div className={styles.cardGrid}>
          {stage.cards.map((card) => {
            const Icon = ICONS[card.icon] ?? Sparkles;
            return (
              <div key={card.title} className={styles.dcard}>
                <span className={styles.chip} aria-hidden="true">
                  <Icon size={20} strokeWidth={1.8} />
                </span>
                <h3 className={styles.dcardTitle}>{card.title}</h3>
                <ul className={styles.dcardList}>
                  {card.points.map((p, idx) => (
                    <li key={idx}>{p}</li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>

      <div className={styles.footBand}>
        <p className={styles.alignNote}>{alignmentNote}</p>
        <button
          type="button"
          className={styles.ctaButton}
          onClick={() =>
            openBooking({
              title: bookingTitle,
              serviceLabel: serviceLabel,
              serviceOptions: serviceOptions,
            })
          }
        >
          {ctaLabel}
        </button>
      </div>
    </div>
  );
}

