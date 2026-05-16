"use client";

import contactDataShape from "@/data/contact.json";
import servicesDataShape from "@/data/services.json";
import siteDataShape from "@/data/site.json";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo, useState, useEffect } from "react";
import { useBooking } from "@/context/BookingContext";
import styles from "./Navbar.module.css";

type SiteData = typeof siteDataShape;
type ContactData = typeof contactDataShape;
type ServicesData = typeof servicesDataShape;

type NavbarProps = {
  siteData: SiteData;
  contactData: ContactData;
  servicesData: ServicesData;
};

export default function Navbar({ siteData, contactData, servicesData }: NavbarProps) {
  const pathname = usePathname();
  const { openBooking } = useBooking();
  const [hasShadow, setHasShadow] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setHasShadow(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleOpenBooking = () => {
    setIsMenuOpen(false);
    openBooking();
  };

  const isActiveLink = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <header className={`${styles.header} ${hasShadow ? styles.headerShadow : ""}`}>
      <div className={styles.inner}>
        <div className={styles.row}>
          <Link href={siteData.navbar.homeHref} className={`font-cormorant ${styles.brand}`}>
            <Image
              src="/logo.png"
              alt="Vathsalya CNNC"
              width={140}
              height={140}
              loading="eager"
              style={{
                height: "56px",
                width: "auto",
                display: "block"
              }}
            />
          </Link>

          <nav className={styles.desktopNav}>
            {siteData.navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={`${styles.navLink} ${isActiveLink(link.href) ? styles.navLinkActive : ""}`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className={styles.desktopCtaWrap}>
            <button
              type="button"
              className={styles.ctaButton}
              onClick={handleOpenBooking}
            >
              {siteData.navbar.bookCta}
            </button>
          </div>

          <button
            type="button"
            className={styles.mobileMenuButton}
            aria-label={siteData.navbar.mobileMenuAriaLabel}
            onClick={() => setIsMenuOpen((prev) => !prev)}
          >
            <span className={styles.mobileMenuIcon}>{isMenuOpen ? "✕" : "☰"}</span>
          </button>
        </div>

        {isMenuOpen && (
          <div className={styles.mobilePanel}>
            <nav className={styles.mobileNav}>
              {siteData.navLinks.map((link) => (
                <Link
                  key={`mobile-${link.label}`}
                  href={link.href}
                  className={`${styles.mobileNavLink} ${isActiveLink(link.href) ? styles.mobileNavLinkActive : ""}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <button
                type="button"
                className={styles.mobileCtaButton}
                onClick={handleOpenBooking}
              >
                {siteData.navbar.bookCta}
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
