// Structured data (schema.org) for Google rich results & local search.
// Server component: renders a JSON-LD <script> in the page.
//
// VERIFY BEFORE SHIPPING:
//  - geo.latitude / geo.longitude: replace with the EXACT coordinates from your
//    Google Business Profile (these are approximate for Nallagandla).
//  - sameAs: confirm these social URLs are correct/active.

export default function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    name: "Vathsalya Child Neuro & Nurture Centre",
    description:
      "Neurodivergent children's care clinic in Hyderabad offering developmental pediatrics, speech therapy, occupational therapy, early learning and family guidance.",
    url: "https://www.vathsalya.co.in",
    logo: "https://www.vathsalya.co.in/logo.png",
    image: "https://www.vathsalya.co.in/images/hero/hero-1.jpg",
    telephone: "+918125151717",
    email: "contactus@vathsalya.co.in",
    address: {
      "@type": "PostalAddress",
      streetAddress:
        "Fifth Floor, F895+XRP, Above Vellanki Foods, HUDA Layout, Nallagandla",
      addressLocality: "Serilingampalle (M)",
      addressRegion: "Telangana",
      postalCode: "500019",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      // APPROXIMATE - replace with exact coordinates from Google Business Profile
      latitude: 17.470186,
      longitude: 78.309538,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ],
        opens: "09:00",
        closes: "18:00",
      },
    ],
    sameAs: [
      "https://instagram.com/vathsalyacnnc",
      "https://facebook.com/vathsalyacnnc",
      "https://www.linkedin.com/company/vathsalya-child-neuro-nurture-centre/",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

