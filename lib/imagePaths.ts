/**
 * Image Path Configuration
 * 
 * This file centralizes all image path references throughout the project.
 * To use an image, simply reference the appropriate path from this object.
 * To change an image, just update the filename here and it will propagate throughout the project.
 * 
 * Example usage:
 * import { imagePaths } from "@/lib/imagePaths";
 * <Image src={imagePaths.hero.main} alt="Hero" />
 */

export const imagePaths = {
  logo: "/logo.png",
  
  hero: {
    main: "/images/hero/hero-1.png",
  },
  
  gallery: {
    // Update with your gallery image filenames
    // Example: image1: "/images/gallery/image-1.jpg",
  },
  
  team: {
    // Update with your team member image filenames
    // Example: member1: "/images/team/member-1.jpg",
  },
  
  services: {
    // Update with your service image filenames
    // Example: service1: "/images/services/service-1.jpg",
  },
  
  icons: {
    assessment: "/images/icons/assessment.svg",
    therapy: "/images/icons/therapy.svg",
    education: "/images/icons/education.svg",
    parenting: "/images/icons/parenting.svg",
  },
};
