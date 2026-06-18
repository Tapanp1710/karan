"use client";
import React, { createContext, useContext, useState } from "react";

export type BookingOptions = {
  /** Pre-fill the service and submit this exact value. */
  presetService?: string;
  /** Hide the Service dropdown (used when the service is already known). */
  hideService?: boolean;
};

type BookingContextType = {
  isBookingOpen: boolean;
  bookingOptions: BookingOptions;
  openBooking: (options?: BookingOptions) => void;
  closeBooking: () => void;
};

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export function BookingProvider({ children }: { children: React.ReactNode }) {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingOptions, setBookingOptions] = useState<BookingOptions>({});

  const openBooking = (options: BookingOptions = {}) => {
    setBookingOptions(options);
    setIsBookingOpen(true);
  };
  const closeBooking = () => {
    setIsBookingOpen(false);
    setBookingOptions({});
  };

  return (
    <BookingContext.Provider
      value={{ isBookingOpen, bookingOptions, openBooking, closeBooking }}
    >
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const context = useContext(BookingContext);
  if (context === undefined) {
    throw new Error("useBooking must be used within a BookingProvider");
  }
  return context;
}

