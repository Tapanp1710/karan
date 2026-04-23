"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./CircleOfCare.module.css";

type CircleOfCareData = typeof import("@/data/circleOfCare.json");

type CircleOfCareProps = {
  data: CircleOfCareData;
};

export default function CircleOfCareClient({ data }: CircleOfCareProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeStep = data.steps[activeIndex];
  const [viewportWidth, setViewportWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 1200);

  useEffect(() => {
    const handleResize = () => setViewportWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isSmallMobile = viewportWidth < 640;
  const isTablet = viewportWidth < 1024;

  // Dynamic coordinates based on container sizes in CSS
  // We'll use these to calculate offsets from the center (50%, 50%)
  const radius = isSmallMobile ? 120 : isTablet ? 145 : 280;

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        {/* Intro Section */}
        <div className={styles.introSection}>
          <h2 className={`font-cormorant ${styles.introTitle}`}>
            {data.intro.title}
          </h2>
          <p className={styles.introDescription}>
            {data.intro.description}
          </p>

          {/* Features Grid */}
          <div className={styles.featuresGrid}>
            {data.features.map((feature, index) => (
              <div key={index} className={styles.featureCard}>
                <h3 className={`font-cormorant ${styles.featureTitle}`}>
                  {feature.title}
                </h3>
                <p className={styles.featureDescription}>
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Interactive Circle Section */}
        <div className={styles.interactiveSection}>
          <div className={styles.sectionHeading}>
            <p className={styles.eyebrow}>Our Comprehensive Approach</p>
            <h2 className={`font-cormorant ${styles.title}`}>Explore Our Services</h2>
          </div>

          <div className={styles.grid}>
            {/* Mobile-only Buttons */}
            <div className={styles.mobileButtons}>
              {data.steps.map((step, index) => (
                <button
                  key={`mobile-${step.id}`}
                  className={`${styles.mobileButton} ${activeIndex === index ? styles.mobileButtonActive : ""}`}
                  onClick={() => setActiveIndex(index)}
                >
                  <Image src={step.icon} alt="" width={24} height={24} />
                  <span>{step.shortLabel}</span>
                </button>
              ))}
            </div>

            {/* Left Side - Interactive Circle (Desktop/Tablet) */}
            <div className={styles.circleContainer}>
              <div className={styles.circleRing} />
              {/* Center Circular Image Placeholder */}
              <div className={styles.circleCenter}>
                <div className={styles.centerImagePlaceholder}>
                  <Image
                    src="/images/hero/hero-1.png"
                    alt="Circle of Care Center"
                    width={300}
                    height={300}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      borderRadius: "50%",
                    }}
                  />
                </div>
              </div>
              <div className={styles.circleItems}>
                {data.steps.map((step, index) => {
                  const angle = (index * 360) / data.steps.length - 90;
                  const x = radius * Math.cos((angle * Math.PI) / 180);
                  const y = radius * Math.sin((angle * Math.PI) / 180);

                  return (
                    <button
                      key={step.id}
                      className={`${styles.circleItem} ${activeIndex === index ? styles.active : ""}`}
                      style={{
                        left: `calc(50% + ${x}px)`,
                        top: `calc(50% + ${y}px)`,
                      }}
                      onClick={() => setActiveIndex(index)}
                      aria-selected={activeIndex === index}
                      title={step.title}
                    >
                      <div className={styles.circleItemIcon}>
                        <Image
                          src={step.icon}
                          alt={step.shortLabel}
                          width={40}
                          height={40}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "contain",
                          }}
                        />
                      </div>
                      <div className={styles.label}>{step.shortLabel}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right Side - Content Panel */}
            <div className={styles.contentPanel}>
              <div className={styles.contentInner}>
                <h3 className={`font-cormorant ${styles.contentTitle}`}>
                  {activeStep.title}
                </h3>
                <p className={styles.contentDescription}>
                  {activeStep.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}