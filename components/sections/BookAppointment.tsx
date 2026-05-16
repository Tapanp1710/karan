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
  const [showModal, setShowModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const serviceTitles = useMemo(() => servicesData.map((service) => service.title), []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
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
          ...formData,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setShowModal(true);
        setFormData(INITIAL_FORM);
        // Auto close modal after 5 seconds
        window.setTimeout(() => setShowModal(false), 5000);
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
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : siteData.bookingForm.submitButton}
        </button>
      </form>

      {/* Confirmation Modal */}
      {showModal && (
        <>
          <div className={styles.modalBackdrop} onClick={() => setShowModal(false)} />
          <div className={styles.modal}>
            <div className={styles.modalContent}>
              <div className={styles.modalIcon}>✓</div>
              <h3 className={`font-cormorant ${styles.modalTitle}`}>Appointment Request Sent!</h3>
              <p className={styles.modalMessage}>
                Thank you for your interest. Your details have been received, and our team will get back to you shortly via email or phone.
              </p>
              <button
                type="button"
                className={styles.modalCloseButton}
                onClick={() => setShowModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </>
      )}
    </section>
  );
}
