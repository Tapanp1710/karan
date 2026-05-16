               "use client";

import { useState } from "react";
import styles from "./FooterLegal.module.css";

const PRIVACY_POLICY = `Last updated: March 2026

Vathsalya Child Neuro & Nurture Center ("Vathsalya CNNC", "we", "us", or "our") is committed to protecting the privacy and confidentiality of all individuals who interact with our services, including children, parents, and caregivers.

1. Information We Collect
We collect personal information that you voluntarily provide when booking appointments, filling out forms, or contacting us. This may include: full name, child's name and date of birth, contact details (phone number and email address), health and developmental history, appointment preferences, and any additional information shared during consultations.

2. How We Use Your Information
The information collected is used solely to: schedule and manage appointments, provide clinical assessments and therapy services, communicate with you regarding your child's care, generate clinical reports and care plans, and comply with applicable healthcare regulations and legal obligations.

3. Information Sharing & Confidentiality
We do not sell, rent, or share your personal or clinical information with third parties without your explicit consent, except where required by law or where necessary to coordinate care with other healthcare providers involved in your child's treatment (with your consent).

4. Data Security
We implement appropriate technical and organisational measures to protect personal and clinical information against unauthorised access, loss, or misuse. All clinical records are stored securely and accessed only by authorised staff.

5. Children's Information
As a paediatric healthcare provider, we handle children's health information with the highest level of care and confidentiality, in accordance with applicable child protection and healthcare privacy laws.

6. Parental Rights
Parents or legal guardians have the right to: access their child's clinical records, request corrections to inaccurate information, withdraw consent for specific uses of information, and request deletion of data where legally permissible.

7. Communication
By providing your contact details, you consent to receiving appointment reminders, service updates, and care-related communications. You may opt out of marketing communications at any time by contacting us.

8. Booking Communication
If you use our website booking form or WhatsApp, please be aware that the respective platform's privacy policies also apply. We use these channels solely to facilitate appointment scheduling and brief communications — we do not share clinical details over these platforms.

9. Contact Us
For any privacy-related queries or to exercise your rights, please contact us at our registered clinic address or via the contact details listed on this website.`;

const TERMS = `Last updated: March 2026

By accessing this website or using any services provided by Vathsalya Child Neuro & Nurture Center ("Vathsalya CNNC"), you agree to the following terms and conditions.

1. Services Provided
Vathsalya CNNC offers paediatric clinical services including developmental assessments, speech therapy, occupational therapy, physiotherapy, behaviour therapy, special education, early intervention, diagnostic screening, parent counselling, school readiness programs, group therapy, neurology follow-up, and comprehensive care planning. All services are delivered by qualified clinical professionals.

2. Appointments & Booking
Appointment requests made via this website or other official channels are subject to availability and confirmation. A booking is confirmed only upon explicit confirmation from our team. We reserve the right to reschedule or cancel appointments in exceptional circumstances, with reasonable notice provided.

3. Cancellations & No-Shows
We request at least 24 hours' notice for cancellation or rescheduling of appointments. Repeated late cancellations or no-shows may result in a cancellation fee or loss of appointment slot. This policy ensures fair access to our services for all families.

4. Information on This Website
The content on this website is provided for general informational purposes only. It does not constitute medical advice, diagnosis, or treatment. All clinical decisions are made solely by our qualified professionals during formal assessments and consultations.

5. Professional Advice Disclaimer
Nothing on this website should be taken as a substitute for professional clinical assessment. Parents and caregivers should always seek the advice of a qualified healthcare professional for concerns about their child's development or health.

6. Intellectual Property
All content on this website — including text, images, logos, and design elements — is the property of Vathsalya CNNC and may not be reproduced, distributed, or used without our prior written permission.

7. Third-Party Links
This website may contain links to third-party websites (such as social media platforms). We are not responsible for the content or privacy practices of such sites.

8. Limitation of Liability
Vathsalya CNNC shall not be liable for any indirect, incidental, or consequential damages arising from use of this website or reliance on information contained herein.

9. Changes to Terms
We reserve the right to update these Terms and Conditions at any time. Changes will be published on this website and take effect immediately upon publication.

10. Governing Law
These terms are governed by the laws of India. Any disputes arising from use of this website or our services shall be subject to the jurisdiction of courts in the applicable jurisdiction.

11. Contact
For any questions regarding these Terms and Conditions, please contact us using the details provided on our Contact page.`;

type LegalItem = { title: string; content: string };

const ITEMS: LegalItem[] = [
  { title: "Privacy Policy", content: PRIVACY_POLICY },
  { title: "Terms & Conditions", content: TERMS },
];

export default function FooterLegal() {
  const [open, setOpen] = useState<Set<string>>(new Set());

  const toggle = (title: string) => {
    setOpen((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(title)) {
        newSet.delete(title);
      } else {
        newSet.add(title);
      }
      return newSet;
    });
  };

  return (
    <div className={styles.wrapper}>
      {ITEMS.map(({ title, content }) => (
        <div key={title} className={styles.item}>
          <button
            className={styles.trigger}
            onClick={() => toggle(title)}
            aria-expanded={open.has(title)}
          >
            <span>{title}</span>
            <span className={`${styles.chevron} ${open.has(title) ? styles.chevronOpen : ""}`}>
              ▾
            </span>
          </button>
          {open.has(title) ? (
            <div className={styles.panel}>
              {content.trim().split("\n\n").map((para, i) => (
                <p key={i} className={styles.para}>{para}</p>
              ))}
            </div>
          ) : null}
        </div>
      ))}
    </div>
  );
}
