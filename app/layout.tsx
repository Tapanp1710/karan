import type { Metadata } from "next";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import siteDataStatic from "@/data/site.json";
import { getData } from "@/lib/getData";
import "./globals.css";
import styles from "./layout.module.css";

export const metadata: Metadata = {
  title: siteDataStatic.metadataTitle,
  description: siteDataStatic.seoDescription,
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
        <div className={styles.appShell}>
          <Navbar siteData={siteData} contactData={contactData} servicesData={servicesData} />
          <main>{children}</main>
          <Footer siteData={siteData} contactData={contactData} />
        </div>
      </body>
    </html>
  );
}
