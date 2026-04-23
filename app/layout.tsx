import type { Metadata } from "next";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import siteDataStatic from "@/data/site.json";
import { getData } from "@/lib/getData";
import { BookingProvider } from "@/context/BookingContext";
import BookingModal from "@/components/ui/BookingModal";
import "./globals.css";
import styles from "./layout.module.css";

export const metadata: Metadata = {
  title: siteDataStatic.metadataTitle,
  description: siteDataStatic.seoDescription,
  viewport: "width=device-width, initial-scale=1",
  openGraph: {
    title: siteDataStatic.metadataTitle,
    description: siteDataStatic.seoDescription,
    images: [siteDataStatic.ogImage],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [siteData, contactData, servicesData] = await Promise.all([
    getData<typeof import("@/data/site.json")>("site"),
    getData<typeof import("@/data/contact.json")>("contact"),
    getData<typeof import("@/data/services.json")>("services"),
  ]);

  return (
    <html lang="en">
      <body className={styles.body}>
        <BookingProvider>
          <div className={styles.appShell}>
            <Navbar siteData={siteData} contactData={contactData} servicesData={servicesData} />
            <main>{children}</main>
            <Footer siteData={siteData} contactData={contactData} />
            <BookingModal siteData={siteData} contactData={contactData} servicesData={servicesData} />
          </div>
        </BookingProvider>
      </body>
    </html>
  );
}
