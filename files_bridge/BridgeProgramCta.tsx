"use client";

import { useBooking } from "@/context/BookingContext";
import styles from "./BridgeProgram.module.css";

type Props = {
  label: string;
  variant?: "solid" | "ghost";
};

export default function BridgeProgramCta({ label, variant = "solid" }: Props) {
  const { openBooking } = useBooking();
  return (
    <button
      type="button"
      className={`${styles.ctaButton} ${variant === "ghost" ? styles.ctaGhost : ""}`}
      onClick={openBooking}
    >
      {label}
    </button>
  );
}
