"use client";

import { useBooking } from "@/context/BookingContext";

type BookingButtonProps = {
  children: React.ReactNode;
  className: string;
};

export default function BookingButton({ children, className }: BookingButtonProps) {
  const { openBooking } = useBooking();

  return (
    <button
      type="button"
      onClick={() => openBooking()}
      className={className}
    >
      {children}
    </button>
  );
}
