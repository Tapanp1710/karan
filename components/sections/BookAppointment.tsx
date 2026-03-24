"use client";

import contactData from "@/data/contact.json";
import siteData from "@/data/site.json";
import servicesData from "@/data/services.json";
import { FormEvent, useMemo, useState } from "react";
import styles from "./BookAppointment.module.css";

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

export default function BookAppointment() {
  const [formData, setFormData] = useState<BookingForm>(INITIAL_FORM);
  const [showToast, setShowToast] = useState(false);

  const serviceTitles = useMemo(() => servicesData.map((service) => service.title), []);

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

    window.setTimeout(() => setShowToast(false), 2800);
  };

  return (
    <section className={styles.section} id="book">
      <h2 className={`font-cormorant ${styles.heading}`}>{siteData.sectionTitles.book}</h2>
      <p className={styles.description}>{siteData.bookingForm.description}</p>

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

      {showToast ? (
        <div className={styles.toast}>
          {siteData.bookingForm.toastSuccess}
        </div>
      ) : null}
    </section>
  );
}
