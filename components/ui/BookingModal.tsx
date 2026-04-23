"use client";

import React, { FormEvent, useMemo, useState } from "react";
import { useBooking } from "@/context/BookingContext";
import styles from "./BookingModal.module.css";

type SiteData = typeof import("@/data/site.json");
type ContactData = typeof import("@/data/contact.json");
type ServicesData = typeof import("@/data/services.json");

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

type BookingModalProps = {
  siteData: SiteData;
  contactData: ContactData;
  servicesData: ServicesData;
};

export default function BookingModal({ siteData, contactData, servicesData }: BookingModalProps) {
  const { isBookingOpen, closeBooking } = useBooking();
  const [formData, setFormData] = useState<BookingForm>(INITIAL_FORM);
  const [showToast, setShowToast] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const serviceTitles = useMemo(() => servicesData.map((service) => service.title), [servicesData]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      // Use Web3Forms or a similar service to send email
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: (siteData.bookingForm as any).web3FormsAccessKey || "YOUR_ACCESS_KEY_HERE",
          subject: siteData.bookingForm.messageTemplate.title,
          from_name: formData.fullName,
          email: (siteData.bookingForm as any).recipientEmail || "care@vathsalyacnnc.com",
          message: [
            `${siteData.bookingForm.messageTemplate.fullName}: ${formData.fullName}`,
            `${siteData.bookingForm.messageTemplate.phoneNumber}: ${formData.phoneNumber}`,
            `${siteData.bookingForm.messageTemplate.childAge}: ${formData.childAge}`,
            `${siteData.bookingForm.messageTemplate.service}: ${formData.service}`,
            `${siteData.bookingForm.messageTemplate.preferredDate}: ${formData.preferredDate}`,
            `${siteData.bookingForm.messageTemplate.additionalNotes}: ${
              formData.additionalNotes || siteData.bookingForm.messageTemplate.emptyNotesFallback
            }`,
          ].join("\n"),
          // Include details as individual fields for better email formatting
          ...formData,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setShowToast(true);
        setFormData(INITIAL_FORM);
        closeBooking();
        window.setTimeout(() => setShowToast(false), 5000);
      } else {
        alert("Something went wrong. Please try again later.");
      }
    } catch (error) {
      console.error("Submission error:", error);
      alert("Failed to send booking request. Please check your connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isBookingOpen) return null;

  return (
    <>
      <div className={styles.modalBackdrop} onClick={closeBooking}>
        <div className={styles.modalCard} onClick={(e) => e.stopPropagation()}>
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
                onChange={(event) => setFormData((prev) => ({ ...prev, fullName: event.target.value }))}
                className={styles.fieldControl}
              />
            </label>

            <label className={styles.fieldLabel}>
              {siteData.bookingForm.fields.phoneNumber}
              <input
                required
                type="tel"
                value={formData.phoneNumber}
                onChange={(event) => setFormData((prev) => ({ ...prev, phoneNumber: event.target.value }))}
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
                onChange={(event) => setFormData((prev) => ({ ...prev, childAge: event.target.value }))}
                className={styles.fieldControl}
              />
            </label>

            <label className={styles.fieldLabel}>
              {siteData.bookingForm.fields.service}
              <select
                required
                value={formData.service}
                onChange={(event) => setFormData((prev) => ({ ...prev, service: event.target.value }))}
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
                onChange={(event) => setFormData((prev) => ({ ...prev, preferredDate: event.target.value }))}
                className={styles.fieldControl}
              />
            </label>

            <label className={`${styles.fieldLabel} ${styles.fullWidth}`}>
              {siteData.bookingForm.fields.additionalNotes}
              <textarea
                rows={4}
                value={formData.additionalNotes}
                onChange={(event) => setFormData((prev) => ({ ...prev, additionalNotes: event.target.value }))}
                className={styles.fieldControl}
              />
            </label>

            <button
              type="submit"
              disabled={isSubmitting}
              className={styles.submitButton}
            >
              {isSubmitting ? "Sending..." : siteData.bookingForm.submitButton}
            </button>
          </form>
        </div>
      </div>

      {showToast && (
        <div className={styles.toast}>
          {siteData.bookingForm.toastSuccess}
        </div>
      )}
    </>
  );
}
