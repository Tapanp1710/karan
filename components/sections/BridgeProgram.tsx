import {
  Book,
  Calculator,
  ClipboardCheck,
  Map as MapIcon,
  Target,
  Users,
  Check,
  type LucideIcon,
} from "lucide-react";
import { getData } from "@/lib/getData";
import BridgeProgramCta from "./BridgeProgramCta";
import styles from "./BridgeProgram.module.css";

type BridgeData = typeof import("@/data/bridge-program.json");

const ICONS: Record<string, LucideIcon> = {
  clipboard: ClipboardCheck,
  map: MapIcon,
  target: Target,
  calculator: Calculator,
  book: Book,
  users: Users,
};

export default async function BridgeProgram() {
  const data = await getData<BridgeData>("bridge-program");

  return (
    <section className={styles.section} id="bridge-program">
      <header className={styles.intro}>
        <p className={styles.eyebrow}>{data.eyebrow}</p>
        <h1 className={`font-cormorant ${styles.heading}`}>{data.heading}</h1>
        <p className={styles.forWhom}>{data.forWhom}</p>
        <p className={styles.lede}>{data.intro}</p>
        <div className={styles.heroCta}>
          <BridgeProgramCta label={data.ctaLabel} />
        </div>
      </header>

      {/* How it works */}
      <h2 className={`font-cormorant ${styles.blockHeading}`}>{data.howHeading}</h2>
      <ol className={styles.steps}>
        {data.steps.map((step, i) => {
          const Icon = ICONS[step.icon] ?? Target;
          return (
            <li key={step.title} className={styles.step}>
              <span className={styles.stepNum}>{i + 1}</span>
              <span className={styles.stepIcon} aria-hidden="true">
                <Icon size={22} strokeWidth={1.8} />
              </span>
              <h3 className={styles.stepTitle}>{step.title}</h3>
              <p className={styles.stepDesc}>{step.description}</p>
            </li>
          );
        })}
      </ol>

      {/* The three bridges */}
      <h2 className={`font-cormorant ${styles.blockHeading}`}>{data.bridgesHeading}</h2>
      <div className={styles.bridges}>
        {data.bridges.map((b) => {
          const Icon = ICONS[b.icon] ?? Book;
          return (
            <article key={b.name} className={styles.bridgeCard}>
              <span className={styles.bridgeIcon} aria-hidden="true">
                <Icon size={24} strokeWidth={1.8} />
              </span>
              <h3 className={styles.bridgeName}>{b.name}</h3>
              <div className={styles.bridgePills}>
                <span className={styles.sessionPill}>{b.sessions}</span>
                {b.freeLabel ? <span className={styles.freePill}>{b.freeLabel}</span> : null}
              </div>
              <p className={styles.bridgeDesc}>{b.description}</p>
            </article>
          );
        })}
      </div>

      {/* Why parents choose us */}
      <div className={styles.whyBlock}>
        <h2 className={`font-cormorant ${styles.whyHeading}`}>{data.whyHeading}</h2>
        <ul className={styles.whyList}>
          {data.why.map((item) => (
            <li key={item} className={styles.whyItem}>
              <span className={styles.whyCheck} aria-hidden="true">
                <Check size={16} strokeWidth={2.4} />
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Alignment + CTA */}
      <div className={styles.footBand}>
        <p className={styles.alignNote}>{data.alignmentNote}</p>
        <BridgeProgramCta label={data.ctaLabel} />
      </div>
    </section>
  );
}
