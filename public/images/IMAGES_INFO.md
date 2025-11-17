# Images Directory - Auto Setup

## Current Images (Available)
- ✅ `PHOTO-2025-11-11-15-06-26.jpg` - Used in Infographic section
- ✅ `PHOTO-2025-11-11-17-25-50.jpg` - Used in ImageGallery section
- ✅ `Screenshot 2025-11-11 at 12.28.08.png` - Used in Testimonials section

## Expected Images (Will be auto-detected when added)

When you copy images from Google Drive to the project root folder, they will automatically be detected and can be used:

1. **camel.png** - Traditional camel delivery (About section)
2. **Aeroplane.png** - Air cargo (Services section)  
3. **Motorcycle.png** - Urban delivery (Features section)
4. **lorry.png** - Heavy freight (Stats section)
5. **Banner.png** - Brand banner (Hero & CTA sections)
6. **Rollermax logo.png** - Official logo (Logo3D component)

## Image Usage in Website

Each section uses background images with an overlay to maintain readability:

- **Hero Section**: `/images/Banner.png`
- **Stats Section**: `/images/lorry.png`
- **ImageGallery Section**: `/images/PHOTO-2025-11-11-17-25-50.jpg`
- **Services Section**: `/images/Aeroplane.png`
- **Infographic Section**: `/images/PHOTO-2025-11-11-15-06-26.jpg`
- **Features Section**: `/images/Motorcycle.png`
- **About Section**: `/images/camel.png`
- **Testimonials Section**: `/images/Screenshot 2025-11-11 at 12.28.08.png`
- **CTA Section**: `/images/Banner.png`

## To Add Images

1. Copy images from Google Drive to project root folder
2. Run: `npm run copy-images` (if script is created)
3. Or manually copy to: `public/images/`
4. Images will be automatically used by the website

## Logo

The logo (`Rollermax logo.png`) is used in:
- Logo3D component (Navbar & Footer)
- Automatically loads with fallback to text if not found

