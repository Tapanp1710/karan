# Image Management Guide

## Folder Structure

The images are organized in the `/public/images/` folder with the following structure:

```
public/
├── logo.png
└── images/
    ├── hero/          # Hero section images
    │   └── hero-1.svg (placeholder)
    ├── gallery/       # Gallery images
    ├── team/          # Team member images
    └── services/      # Service-related images
```

## How to Use Images

### Option 1: Direct Path (Simple, for one-time use)
```tsx
import Image from "next/image";

<Image 
  src="/images/hero/hero-1.svg" 
  alt="Hero" 
  width={400} 
  height={500}
/>
```

### Option 2: Using Image Paths Utility (Recommended, for consistency)
```tsx
import Image from "next/image";
import { imagePaths } from "@/lib/imagePaths";

<Image 
  src={imagePaths.hero.main} 
  alt="Hero" 
  width={400} 
  height={500}
/>
```

## How to Add New Images

1. **Place the image file** in the appropriate folder:
   - Hero images → `/public/images/hero/`
   - Gallery images → `/public/images/gallery/`
   - Team images → `/public/images/team/`
   - Service images → `/public/images/services/`

2. **Update `lib/imagePaths.ts`** with the new image reference:
   ```typescript
   hero: {
     main: "/images/hero/hero-1.svg",
     secondary: "/images/hero/hero-2.jpg",  // Add new image here
   }
   ```

3. **Use the image** in your components:
   ```tsx
   <Image src={imagePaths.hero.secondary} alt="Secondary Hero" width={400} height={500} />
   ```

## How to Replace an Image

Simply replace the image file with a new one **using the same filename**, and it will automatically appear throughout the project where it's being used.

**Example:** To replace the hero image:
1. Delete `/public/images/hero/hero-1.svg`
2. Add your new image with the same name: `/public/images/hero/hero-1.svg`
3. All components using `imagePaths.hero.main` will automatically show the new image!

## Current Images

- **Hero:** `/images/hero/hero-1.svg` (placeholder SVG)

## Tips

- Always use Next.js `Image` component for optimization
- Keep image files organized in their respective folders
- Use the `imagePaths.ts` utility for consistency
- Update `imagePaths.ts` whenever adding new images
