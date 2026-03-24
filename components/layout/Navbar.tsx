"use client";

import contactDataShape from "@/data/contact.json";
import servicesDataShape from "@/data/services.json";
import siteDataShape from "@/data/site.json";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FormEvent, useEffect, useMemo, useState } from "react";
import styles from "./Navbar.module.css";

type SiteData = typeof siteDataShape;
type ContactData = typeof contactDataShape;
type ServicesData = typeof servicesDataShape;

type BookingForm = {
  fullName: string;
  phoneNumber: string;
  childAge: string;
  service: string;
  preferredDate: string;
  additionalNotes: string;
};

const INITIAL_FORM: BookingForm = {
  fullName: "",
  phoneNumber: "",
  childAge: "",
  service: "",
  preferredDate: "",
  additionalNotes: "",
};

type NavbarProps = {
  siteData: SiteData;
  contactData: ContactData;
  servicesData: ServicesData;
};

export default function Navbar({ siteData, contactData, servicesData }: NavbarProps) {
  const pathname = usePathname();
  const [hasShadow, setHasShadow] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [formData, setFormData] = useState<BookingForm>(INITIAL_FORM);
  const [showToast, setShowToast] = useState(false);

  const serviceTitles = useMemo(() => servicesData.map((service) => service.title), [servicesData]);

  useEffect(() => {
    const onScroll = () => setHasShadow(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const openBooking = () => {
    setIsMenuOpen(false);
    setIsBookingOpen(true);
  };

  const closeBooking = () => {
    setIsBookingOpen(false);
  };

  const isActiveLink = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }

    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const message = [
      siteData.bookingForm.messageTemplate.title,
      `${siteData.bookingForm.messageTemplate.fullName}: ${formData.fullName}`,
      `${siteData.bookingForm.messageTemplate.phoneNumber}: ${formData.phoneNumber}`,
      `${siteData.bookingForm.messageTemplate.childAge}: ${formData.childAge}`,
      `${siteData.bookingForm.messageTemplate.service}: ${formData.service}`,
      `${siteData.bookingForm.messageTemplate.preferredDate}: ${formData.preferredDate}`,
      `${siteData.bookingForm.messageTemplate.additionalNotes}: ${
        formData.additionalNotes || siteData.bookingForm.messageTemplate.emptyNotesFallback
      }`,
    ].join("\n");

    const whatsappNumber = contactData.whatsapp.replace(/\D/g, "");
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    setShowToast(true);
    setFormData(INITIAL_FORM);
    setIsBookingOpen(false);
    window.setTimeout(() => setShowToast(false), 2500);
  };

  return (
    <>
      <header
        className={`${styles.header} ${hasShadow ? styles.headerShadow : ""}`}
      >
        <div className={styles.inner}>
          <div className={styles.row}>
            <Link href={siteData.navbar.homeHref} className={`font-cormorant ${styles.brand}`}>
              <Image
                src="/logo.png"
                alt="Vathsalya CNNC"
                width={130}
                height={48}
                priority
                style={{ objectFit: "contain" }}
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
                onClick={openBooking}
              >
                {siteData.navbar.bookCta}
              </button>
            </div>

            <button
              type="button"
              className={styles.mobileMenuButton}
              aria-label={siteData.navbar.mobileMenuAriaLabel}
              onClick={() => setIsMenuOpen((previous) => !previous)}
            >
              <span className={styles.mobileMenuIcon}>{isMenuOpen ? "✕" : "☰"}</span>
            </button>
          </div>

          {isMenuOpen ? (
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
                  onClick={openBooking}
                >
                  {siteData.navbar.bookCta}
                </button>
              </nav>
            </div>
          ) : null}
        </div>
      </header>

      {isBookingOpen ? (
        <div className={styles.modalBackdrop}>
          <div className={styles.modalCard}>
            <div className={styles.modalHeader}>
              <h2 className={`font-cormorant ${styles.modalTitle}`}>{siteData.sectionTitles.book}</h2>
              <button
                type="button"
                aria-label="Close booking form"
                className={styles.closeButton}
                onClick={closeBooking}
              >
                ✕
              </button>
            </div>

            <form className={styles.formGrid} onSubmit={handleSubmit}>
              <label className={styles.fieldLabel}>
                {siteData.bookingForm.fields.fullName}
                <input
                  required
                  type="text"
                  value={formData.fullName}
                  onChange={(event) => setFormData((previous) => ({ ...previous, fullName: event.target.value }))}
                  className={styles.fieldControl}
                />
              </label>

              <label className={styles.fieldLabel}>
                {siteData.bookingForm.fields.phoneNumber}
                <input
                  required
                  type="tel"
                  value={formData.phoneNumber}
                  onChange={(event) => setFormData((previous) => ({ ...previous, phoneNumber: event.target.value }))}
                  className={styles.fieldControl}
                />
              </label>

              <label className={styles.fieldLabel}>
                {siteData.bookingForm.fields.childAge}
                <input
                  required
                  type="text"
                  placeholder={siteData.bookingForm.fields.childAgePlaceholder}
                  value={formData.childAge}
                  onChange={(event) => setFormData((previous) => ({ ...previous, childAge: event.target.value }))}
                  className={styles.fieldControl}
                />
              </label>

              <label className={styles.fieldLabel}>
                {siteData.bookingForm.fields.service}
                <select
                  required
                  value={formData.service}
                  onChange={(event) => setFormData((previous) => ({ ...previous, service: event.target.value }))}
                  className={styles.fieldControl}
                >
                  <option value="">{siteData.bookingForm.fields.servicePlaceholder}</option>
                  {serviceTitles.map((title) => (
                    <option key={title} value={title}>
                      {title}
                    </option>
                  ))}
                </select>
              </label>

              <label className={`${styles.fieldLabel} ${styles.fullWidth}`}>
                {siteData.bookingForm.fields.preferredDate}
                <input
                  required
                  type="date"
                  value={formData.preferredDate}
                  onChange={(event) => setFormData((previous) => ({ ...previous, preferredDate: event.target.value }))}
                  className={styles.fieldControl}
                />
              </label>

              <label className={`${styles.fieldLabel} ${styles.fullWidth}`}>
                {siteData.bookingForm.fields.additionalNotes}
                <textarea
                  rows={4}
                  value={formData.additionalNotes}
                  onChange={(event) => setFormData((previous) => ({ ...previous, additionalNotes: event.target.value }))}
                  className={styles.fieldControl}
                />
              </label>

              <button
                type="submit"
                className={styles.submitButton}
              >
                {siteData.bookingForm.submitButton}
              </button>
            </form>
          </div>
        </div>
      ) : null}

      {showToast ? (
        <div className={styles.toast}>
          {siteData.bookingForm.toastSuccess}
        </div>
      ) : null}
    </>
  );
}
