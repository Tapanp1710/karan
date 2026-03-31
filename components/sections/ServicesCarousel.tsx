"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import Link from "next/link";
import styles from "./ServicesCarousel.module.css";

type Service = (typeof import("@/data/services.json"))[number];

type ServicesCarouselProps = {
  services: Service[];
};

export default function ServicesCarousel({ services }: ServicesCarouselProps) {
  const safeServices = services || [];
  const [mounted, setMounted] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [layoutState, setLayoutState] = useState({
    viewportWidth: 1280,
    cdDiameter: 880,
    cdCenterX: 192,
    cdCenterY: 400,
    cdRightEdge: 632,
    activeCardWidth: 680,
    sideCardWidth: 580,
  });
  const discRef = useRef<HTMLDivElement | null>(null);
  const cardsContainerRef = useRef<HTMLDivElement | null>(null);

  const isMobile = layoutState.viewportWidth < 768;

  const { cdDiameter, cdCenterX, cdCenterY, cdRightEdge, activeCardWidth, sideCardWidth } = layoutState;

  const activeLeft = cdRightEdge - activeCardWidth * 0.45;
  const sideLeft = cdRightEdge - sideCardWidth * 0.45;

  const topY = cdCenterY - 240;
  const middleY = cdCenterY - 60;
  const bottomY = cdCenterY + 160;
  const discRotation = -activeIndex * 28;
  const holeRadius = 40;
  const holeSize = 12;
  const upperHoleRadius = cdDiameter * 0.3;
  const upperHoleSize = 44;
  const upperHoleYOffset = -20;
  const holeCenterOffset = holeSize / 2;
  const upperHoleCenterOffset = upperHoleSize / 2;
  const discHoles = Array.from({ length: 5 }, (_, index) => {
    const angle = ((Math.PI * 2) / 5) * index - Math.PI / 2;
    return {
      left: `calc(50% + ${Math.cos(angle) * holeRadius}px - ${holeCenterOffset}px)`,
      top: `calc(50% + ${Math.sin(angle) * holeRadius}px - ${holeCenterOffset}px)`,
    };
  });
  const upperDiscHoles = Array.from({ length: 5 }, (_, index) => {
    const angle = ((Math.PI * 2) / 5) * index - Math.PI / 2 + Math.PI / 5;
    return {
      left: `calc(50% + ${Math.cos(angle) * upperHoleRadius}px - ${upperHoleCenterOffset}px)`,
      top: `calc(50% + ${Math.sin(angle) * upperHoleRadius + upperHoleYOffset}px - ${upperHoleCenterOffset}px)`,
    };
  });

  useEffect(() => {
    setMounted(true);

    const updateLayout = () => {
      const width = window.innerWidth;
      const nextCdDiameter = window.innerHeight * 0.82;
      const nextCdCenterX = window.innerWidth * 0.18;
      const nextCdCenterY = window.innerHeight * 0.5;
      const nextCdRightEdge = nextCdCenterX + nextCdDiameter / 2;
      const nextActiveCardWidth = Math.min(560, width * 0.42);
      const nextSideCardWidth = Math.min(440, width * 0.34);

      setLayoutState({
        viewportWidth: width,
        cdDiameter: nextCdDiameter,
        cdCenterX: nextCdCenterX,
        cdCenterY: nextCdCenterY,
        cdRightEdge: nextCdRightEdge,
        activeCardWidth: nextActiveCardWidth,
        sideCardWidth: nextSideCardWidth,
      });
    };

    updateLayout();
    window.addEventListener("resize", updateLayout);

    return () => window.removeEventListener("resize", updateLayout);
  }, []);

  const rotateBy = useCallback((step: number) => {
    setActiveIndex((previous) => {
      const total = safeServices.length;
      if (total === 0) {
        return 0;
      }

      return (previous + step + total) % total;
    });
  }, [safeServices.length]);

  useEffect(() => {
    if (!mounted || safeServices.length === 0) {
      return;
    }

    let lastStep = 0;

    const handleScroll = (event: WheelEvent) => {
      event.preventDefault();
      event.stopPropagation();

      const now = Date.now();
      if (now - lastStep < 600) {
        return;
      }

      lastStep = now;
      setActiveIndex((previous) => (
        event.deltaY > 0
          ? (previous + 1) % safeServices.length
          : (previous - 1 + safeServices.length) % safeServices.length
      ));
    };

    const disc = discRef.current;
    const cards = cardsContainerRef.current;

    disc?.addEventListener("wheel", handleScroll, { passive: false });
    cards?.addEventListener("wheel", handleScroll, { passive: false });

    return () => {
      disc?.removeEventListener("wheel", handleScroll);
      cards?.removeEventListener("wheel", handleScroll);
    };
  }, [mounted, safeServices.length]);

  if (!safeServices || safeServices.length === 0) {
    return <div>Loading...</div>;
  }

  if (!mounted) {
    return <div style={{ minHeight: "100vh" }} />;
  }

  if (isMobile) {
    return (
      <div className={styles.mobileList}>
        {safeServices.map((service) => (
          <Link
            key={service.id}
            href={`/services/${service.id}`}
            className={styles.mobileCard}
          >
            <p className={`material-symbols-rounded ${styles.mobileEmoji}`}>{service.emoji}</p>
            <h3 className={`font-cormorant ${styles.mobileTitle}`}>{service.title}</h3>
            <p className={styles.mobileDescription}>{service.shortDescription}</p>
          </Link>
        ))}
      </div>
    );
  }

  const topIndex = (activeIndex - 1 + safeServices.length) % safeServices.length;
  const activeService = safeServices[activeIndex] || safeServices[0];
  const bottomIndex = (activeIndex + 1) % safeServices.length;
  const visibleCards = [
    {
      position: "top",
      sourceIndex: topIndex,
      service: safeServices[topIndex] || safeServices[0],
      style: { top: `${topY}px`, left: `${sideLeft}px` },
      isActive: false,
    },
    {
      position: "middle",
      sourceIndex: activeIndex,
      service: activeService,
      style: { top: `${middleY}px`, left: `${activeLeft}px` },
      isActive: true,
    },
    {
      position: "bottom",
      sourceIndex: bottomIndex,
      service: safeServices[bottomIndex] || safeServices[0],
      style: { top: `${bottomY}px`, left: `${sideLeft}px` },
      isActive: false,
    },
  ];

  return (
    <section className={styles.section} aria-label="Services carousel">
      <div
        className={styles.discShell}
        style={{
          width: `${cdDiameter}px`,
          height: `${cdDiameter}px`,
          left: `${cdCenterX}px`,
          top: `${cdCenterY}px`,
          transform: "translate(-50%, -50%)",
        }}
      >
        <div
          ref={discRef}
          className={styles.disc}
          style={{
            cursor: "ns-resize",
            background: "linear-gradient(135deg, var(--color-ivory) 0%, color-mix(in srgb, var(--color-peach-soft) 45%, var(--color-cream) 55%) 30%, color-mix(in srgb, var(--color-peach) 50%, var(--color-taupe) 50%) 60%, var(--color-taupe) 100%)",
            boxShadow: "inset 0 0 80px rgba(176,140,130,0.3), 0 20px 60px rgba(176,140,130,0.2)",
            transition: "transform 0.7s cubic-bezier(0.34, 1.56, 0.64, 1)",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              transform: `rotate(${discRotation}deg)`,
              transition: "transform 0.7s cubic-bezier(0.34, 1.56, 0.64, 1)",
            }}
          >
            <div
              className={styles.discConic}
              style={{
                background: "conic-gradient(from 0deg, color-mix(in srgb, var(--color-peach) 55%, transparent) 0deg, color-mix(in srgb, var(--color-sage) 45%, transparent) 60deg, color-mix(in srgb, var(--color-peach-soft) 60%, transparent) 120deg, color-mix(in srgb, var(--color-taupe) 45%, transparent) 180deg, color-mix(in srgb, var(--color-peach) 50%, transparent) 240deg, color-mix(in srgb, var(--color-sage-deep) 30%, transparent) 300deg, color-mix(in srgb, var(--color-peach) 55%, transparent) 360deg)",
              }}
            />
            <div style={{
              position: "absolute",
              inset: "8%",
              borderRadius: "50%",
              border: "1px solid rgba(180,140,130,0.4)",
              background: "transparent",
            }} />
            <div style={{
              position: "absolute",
              inset: "20%",
              borderRadius: "50%",
              border: "1px solid rgba(180,140,130,0.3)",
              background: "transparent",
            }} />
            <div style={{
              position: "absolute",
              inset: "35%",
              borderRadius: "50%",
              border: "1px solid rgba(180,140,130,0.25)",
              background: "transparent",
            }} />
            <div style={{
              position: "absolute",
              inset: "42%",
              borderRadius: "50%",
              background: "radial-gradient(circle, var(--color-taupe), color-mix(in srgb, var(--color-taupe) 75%, var(--color-ink-soft) 25%))",
            }} />
            {discHoles.map((holeStyle, index) => (
              <div
                key={`hole-${index}`}
                style={{
                  position: "absolute",
                  width: `${holeSize}px`,
                  height: `${holeSize}px`,
                  borderRadius: "50%",
                  background: "radial-gradient(circle, color-mix(in srgb, var(--color-ink-soft) 75%, var(--color-taupe) 25%) 0%, color-mix(in srgb, var(--color-ink) 80%, var(--color-ink-soft) 20%) 70%, var(--color-ink) 100%)",
                  boxShadow: "inset 0 1px 2px rgba(255,255,255,0.15), inset 0 -1px 2px rgba(0,0,0,0.35)",
                  zIndex: 4,
                  ...holeStyle,
                }}
              />
            ))}
            {upperDiscHoles.map((holeStyle, index) => (
              <div
                key={`upper-hole-${index}`}
                style={{
                  position: "absolute",
                  width: `${upperHoleSize}px`,
                  height: `${upperHoleSize}px`,
                  borderRadius: "50%",
                  background: "radial-gradient(circle, color-mix(in srgb, var(--color-ink-soft) 70%, var(--color-taupe) 30%) 0%, color-mix(in srgb, var(--color-ink) 85%, var(--color-ink-soft) 15%) 72%, color-mix(in srgb, var(--color-ink) 92%, black 8%) 100%)",
                  boxShadow: "inset 0 1px 2px rgba(255,255,255,0.14), inset 0 -2px 3px rgba(0,0,0,0.38)",
                  zIndex: 5,
                  ...holeStyle,
                }}
              />
            ))}
            <div
              className={styles.discGlow}
              style={{
                background: "radial-gradient(ellipse at 25% 25%, rgba(255,255,255,0.35), transparent 55%)",
              }}
            />
            <div
              className={styles.discHub}
              style={{
                width: 60,
                height: 60,
                background: "radial-gradient(circle, color-mix(in srgb, var(--color-peach-soft) 45%, var(--color-taupe) 55%), color-mix(in srgb, var(--color-taupe) 80%, var(--color-ink-soft) 20%))",
                border: "3px solid rgba(180,140,130,0.4)",
              }}
            />
          </div>

          <div style={{
            position: "absolute",
            right: "-18px",
            top: "50%",
            transform: "translateY(-50%)",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            zIndex: 30,
          }}>
            <button type="button" aria-label="Previous service" onClick={() => rotateBy(-1)}
              style={{
                width: 36,
                height: 36,
                borderRadius: "50%",
                background: "var(--color-peach)",
                color: "white",
                border: "none",
                cursor: "pointer",
                fontSize: "1rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 2,
              }}
            >
              <ChevronUp size={18} color="white" />
              <span style={{ fontSize: "0.65rem", lineHeight: 1 }}>⬆️</span>
            </button>
            <button type="button" aria-label="Next service" onClick={() => rotateBy(1)}
              style={{
                width: 36,
                height: 36,
                borderRadius: "50%",
                background: "var(--color-peach)",
                color: "white",
                border: "none",
                cursor: "pointer",
                fontSize: "1rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 2,
              }}
            >
              <ChevronDown size={18} color="white" />
              <span style={{ fontSize: "0.65rem", lineHeight: 1 }}>⬇️</span>
            </button>
          </div>
        </div>
      </div>

      <div ref={cardsContainerRef}>
        {visibleCards.map((item) => {
          if (!item.service) {
            return null;
          }

          return (
            <Link
              key={safeServices.length >= 3 ? `${item.service.id}-${item.sourceIndex}` : `${item.service.id}-${item.position}`}
              href={`/services/${item.service.id}`}
              className={`${styles.card} ${item.isActive ? styles.cardActive : styles.cardInactive}`}
              style={{
                ...item.style,
                zIndex: 10,
                width: item.isActive ? `${activeCardWidth}px` : `${sideCardWidth}px`,
                minHeight: item.isActive ? "200px" : "90px",
                height: item.isActive ? "auto" : "90px",
                transform: `translate(0, -50%) scale(${item.isActive ? 1.05 : 0.92})`,
                transition: "top 0.65s cubic-bezier(0.22, 1, 0.36, 1), left 0.65s cubic-bezier(0.22, 1, 0.36, 1), width 0.65s cubic-bezier(0.22, 1, 0.36, 1), min-height 0.65s cubic-bezier(0.22, 1, 0.36, 1), height 0.65s cubic-bezier(0.22, 1, 0.36, 1), transform 0.65s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.5s ease",
                willChange: "top, left, width, transform, opacity",
                display: "block",
                textDecoration: "none",
              }}
            >
              <p className={`material-symbols-rounded ${item.isActive ? styles.activeEmoji : styles.sideEmoji}`}>
                {item.service.emoji}
              </p>
              {item.isActive ? (
                <>
                  <h3 className={`font-cormorant ${styles.activeTitle}`}>{item.service.title}</h3>
                  <p className={styles.activeDescription}>{item.service.shortDescription}</p>
                </>
              ) : (
                <h3 className={`font-cormorant ${styles.sideTitle}`}>{item.service.title}</h3>
              )}
            </Link>
          );
        })}
      </div>

      <div style={{
        position: "absolute",
        right: "2.5rem",
        top: "50%",
        transform: "translateY(-50%)",
        zIndex: 20,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "6px",
      }}>
        <span style={{
          fontFamily: "Cormorant Garamond",
          fontSize: "3.5rem",
          fontWeight: "300",
          color: "var(--color-peach)",
          lineHeight: 1,
          transition: "all 0.7s cubic-bezier(0.34, 1.56, 0.64, 1)",
        }}>
          {String(activeIndex + 1).padStart(2, "0")}
        </span>
        <span style={{
          width: "1px",
          height: "48px",
          background: "linear-gradient(to bottom, var(--color-peach), var(--color-taupe))",
          display: "block",
        }} />
        <span style={{
          fontFamily: "DM Sans",
          fontSize: "1rem",
          color: "var(--color-taupe)",
          letterSpacing: "0.1em",
        }}>
          {String(services.length).padStart(2, "0")}
        </span>
      </div>
    </section>
  );
}
