/**
 * JSON-LD Schema Markup for SEO
 * Helps search engines understand business structure and services
 */

interface OrganizationSchema {
  name: string;
  description: string;
  url: string;
  logo: string;
  telephone: string;
  email: string;
  address: {
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
    addressCountry: string;
  };
  sameAs: string[];
}

export function generateOrganizationSchema(data: OrganizationSchema) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: data.name,
    description: data.description,
    url: data.url,
    logo: data.logo,
    telephone: data.telephone,
    email: data.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: data.address.streetAddress,
      addressLocality: data.address.addressLocality,
      addressRegion: data.address.addressRegion,
      postalCode: data.address.postalCode,
      addressCountry: data.address.addressCountry,
    },
    sameAs: data.sameAs,
  };
}

export function generateLocalBusinessSchema(
  organizationSchema: object,
  hours: { day: string; open: string; close: string }[]
) {
  return {
    ...organizationSchema,
    '@type': 'LocalBusiness',
    'priceRange': '$',
    'openingHoursSpecification': hours.map((h) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: h.day,
      opens: h.open,
      closes: h.close,
    })),
  };
}

export function generateServiceSchema(service: {
  name: string;
  description: string;
  provider: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'MedicalService',
    name: service.name,
    description: service.description,
    provider: {
      '@type': 'MedicalBusiness',
      name: service.provider,
    },
  };
}
