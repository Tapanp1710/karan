"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import styles from "./TeamCard.module.css";

type TeamMember = (typeof import("@/data/team.json"))[number];

type TeamCardProps = {
  member: TeamMember;
};

export default function TeamCard({ member }: TeamCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const modalContent = (
    <>
      {/* Backdrop overlay */}
      {isModalOpen && (
        <div
          className={styles.backdrop}
          onClick={() => setIsModalOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Details Modal */}
      {isModalOpen && (
        <article className={styles.modal}>
          <button
            className={styles.closeButton}
            onClick={() => setIsModalOpen(false)}
            aria-label="Close modal"
          >
            ✕
          </button>

          <div className={styles.modalImageWrap}>
            <Image
              src={member.imagePath}
              alt={member.name}
              width={420}
              height={320}
              className={styles.image}
            />
          </div>

          <div className={styles.modalContent}>
            <h3 className={`font-cormorant ${styles.modalName}`}>{member.name}</h3>
            <p className={styles.modalRole}>{member.role}</p>
            <p className={styles.modalQualification}>{member.qualification}</p>
            <p className={styles.modalBio}>{member.bio}</p>
          </div>
        </article>
      )}
    </>
  );

  const compactCard = (
    <article
      className={styles.card}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={styles.imageWrap}>
        <Image
          src={member.imagePath}
          alt={member.name}
          width={420}
          height={320}
          className={styles.image}
        />
      </div>

      <div className={styles.content}>
        <h3 className={`font-cormorant ${styles.name}`}>{member.name}</h3>
        <p className={styles.role}>{member.role}</p>

        {isHovered && (
          <button
            className={styles.knowMoreButton}
            onClick={() => setIsModalOpen(true)}
          >
            KNOW MORE
          </button>
        )}
      </div>
    </article>
  );

  // Render modal in portal when open
  if (isModalOpen && isMounted) {
    return createPortal(
      <>
        {modalContent}
      </>,
      document.body
    );
  }

  return compactCard;
}
