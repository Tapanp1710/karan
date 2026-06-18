import type { Metadata } from "next";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import siteDataStatic from "@/data/site.json";
import { getData } from "@/lib/getData";
import { BookingProvider } from "@/context/BookingContext";
import BookingModal from "@/components/ui/BookingModal";
import "./globals.css";
import styles from "./layout.module.css";
import JsonLd from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.vathsalya.co.in"),
  title: siteDataStatic.metadataTitle,
  description: siteDataStatic.seoDescription,
  icons: {
    icon: siteDataStatic.logoPath,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: siteDataStatic.metadataTitle,
    description: siteDataStatic.seoDescription,
    images: [siteDataStatic.ogImage],
    type: "website",
    url: "https://www.vathsalya.co.in",
  },
  twitter: {
    card: "summary_large_image",
    title: siteDataStatic.metadataTitle,
    description: siteDataStatic.seoDescription,
    images: [siteDataStatic.ogImage],
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
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
        <JsonLD />
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
