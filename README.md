# 🏛️ Shreeram Builders & Developers — Diamond Market Website

**Version 2.0 - Modern White Theme with 3D Building Videos**

---

## ✨ What's New in v2.0

### 🎨 **Design Transformation**
- ✅ **Complete White/Light Theme** - Professional, clean, luxury aesthetic
- ✅ **Modern Color Scheme** - Gold accents on white background
- ✅ **Improved Typography** - Enhanced readability with better font hierarchy
- ✅ **Better Spacing** - Professional padding and margins throughout

### 🎬 **3D Building Integration**
- ✅ **Hero Video Background** - Cinematic building showcase on homepage
- ✅ **About Section 3D Render** - Interactive video with play button
- ✅ **Project Showcase Video** - Full 3D building visualization
- ✅ **3D Carousel** - Rotating building renders with captions
  - Front Elevation View
  - Facade Pan Overview
  - Cinematic Journey

### 🚀 **Performance & Experience**
- ✅ **Smooth Animations** - Reveal animations on scroll
- ✅ **Mobile Optimized** - Fully responsive design
- ✅ **Lazy Loading** - Videos load efficiently
- ✅ **Custom Cursor** - Interactive cursor tracking
- ✅ **Enhanced Forms** - Better booking and contact forms

### 🎯 **Key Features**
- 📱 **Fully Responsive** - Works perfectly on mobile, tablet, desktop
- 🎥 **Video Integration** - 6 high-quality 3D building videos
- 🔄 **Auto-rotating Carousel** - Shows 3D building renders
- 📍 **Location Map** - Integrated Google Maps
- 📋 **Booking Forms** - Site visit scheduling
- 💬 **WhatsApp Integration** - Direct communication button
- 📧 **Contact Forms** - Lead capture system
- ⭐ **Testimonials** - Customer reviews section

---

## 📂 Project Structure

```
shreeram-builders-website/
├── index.html              # Main website
├── css/
│   └── style.css          # All styling (white theme)
├── js/
│   └── main.js            # Interactive features & animations
├── images/
│   ├── logo-ram.png       # Company logo
│   ├── building-day.png   # Building photo
│   ├── building-hero.mp4  # Hero video
│   ├── building-3d-1.mp4  # 3D render video 1
│   ├── building-3d-2.mp4  # 3D render video 2
│   ├── building-carousel-1.mp4 # Carousel video 1
│   ├── building-carousel-2.mp4 # Carousel video 2
│   ├── building-carousel-3.mp4 # Carousel video 3
│   └── ... (other images)
├── package.json           # Project metadata
└── README.md             # This file
```

---

## 🎨 Color Palette

### Primary Colors
- **Gold:** `#c9a84c` - Accent color for buttons and highlights
- **White:** `#ffffff` - Main background
- **Off-White:** `#f9f8f6` - Section backgrounds
- **Text Dark:** `#2a2a2a` - Primary text color

### Secondary Colors
- **Cream:** `#f5f3f0` - Light backgrounds
- **Light Grey:** `#e8e6e2` - Borders and dividers
- **Grey:** `#999999` - Secondary text
- **Text Light:** `#5a5a5a` - Muted text

---

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Python 3+ (for local server) or any HTTP server

### Local Development

**Using Python (Recommended):**
```bash
cd shreeram-builders-website
python -m http.server 8000
```
Then open: `http://localhost:8000`

**Using Node.js:**
```bash
npx http-server
```

**Using Live Server (VS Code):**
1. Install "Live Server" extension
2. Right-click `index.html`
3. Select "Open with Live Server"

---

## 📱 Sections Overview

### 1. **Navigation**
- Fixed header with logo and menu
- Mobile hamburger menu
- Smooth scrolling to sections
- CTA "Book Site Visit" button

### 2. **Hero Section**
- Full-screen video background
- Cinematic overlay
- RERA certification badge
- Call-to-action buttons

### 3. **Stats Bar**
- Starting price
- Unit options
- RERA certification
- Distance from station

### 4. **About Section**
- 3D building video showcase
- Company story
- Key differentiators
- Project highlights

### 5. **Diamond Market Project**
- Large 3D building video
- Unit types and pricing
  - 1 BHK Flat (₹21.49L)
  - 2 BHK Flat (₹31.49L) - Featured
  - Commercial Space (₹18.99L)

### 6. **3D Showcase Carousel**
- Three rotating building renders
- Manual and automatic rotation
- Video captions
- Keyboard navigation (← →)

### 7. **Amenities**
- Swimming pool
- Gym & wellness center
- Kids play area
- Parking
- 24/7 security
- Landscaped garden
- Power backup
- Water supply

### 8. **Location**
- Google Maps integration
- Railway station proximity
- Highway access
- Healthcare facilities
- Educational institutions
- Shopping areas
- Green spaces

### 9. **Site Visit Booking**
- Name, phone, email fields
- Date picker
- Property type selector
- Form validation

### 10. **Testimonials**
- Star ratings (5/5)
- Customer quotes
- Avatar initials
- Location tags

### 11. **Contact Section**
- Location details
- Phone numbers
- Email address
- Instagram handle
- WhatsApp button
- Contact form

### 12. **Footer**
- Company branding
- Copyright information
- Quick links
- RERA approval number

---

## 🎥 Video Files & Placement

| Video File | Size | Location | Purpose |
|-----------|------|----------|---------|
| `building-hero.mp4` | 7.9 MB | Hero Section | Full-screen background |
| `building-3d-1.mp4` | 3.1 MB | About Section | Company story visual |
| `building-3d-2.mp4` | 4.4 MB | Project Section | Main project showcase |
| `building-carousel-1.mp4` | 2.6 MB | Carousel | Front elevation view |
| `building-carousel-2.mp4` | 5.7 MB | Carousel | Facade pan overview |
| `building-carousel-3.mp4` | 21 MB | Carousel | Cinematic journey |

**Total Video Size:** ~44.7 MB

---

## 🔧 Customization

### Change Company Details
Edit these in `index.html`:
```html
<!-- Contact Information -->
<a href="tel:8591982619">+91 85919 82619</a>
<a href="mailto:shreerambuildersndevelopers@gmail.com">Email</a>
<a href="https://instagram.com/shreeram_builders_">Instagram</a>
```

### Change Colors
Edit CSS variables in `css/style.css`:
```css
:root {
  --gold:      #c9a84c;  /* Change accent color */
  --white:     #ffffff;  /* Change background */
  --text:      #2a2a2a;  /* Change text color */
  /* ... more variables */
}
```

### Modify Pricing
Find pricing in `index.html`:
```html
<div class="unit-price">₹21.49 Lakhs<sup>*</sup></div>
```

### Update Videos
Replace video files in `images/` folder:
```html
<video class="hero-video" autoplay muted loop playsinline>
  <source src="images/building-hero.mp4" type="video/mp4">
</video>
```

---

## ⚙️ Features Explained

### Custom Cursor
- Gold dot at cursor position
- Ring expands on hover
- Smooth animations

### Scroll Reveal Animations
- Elements fade in as you scroll
- Staggered timing for visual interest
- Smooth transitions

### Auto-rotating Carousel
- Changes slide every 6 seconds
- Manual controls (← →)
- Keyboard navigation
- Animated dots

### Responsive Design
- Mobile-first approach
- Hamburger menu on small screens
- Video backgrounds adapt to screen size
- Touch-friendly buttons

### Form Validation
- Required field checking
- Toast notifications
- Form clearing after submission

### Smooth Scrolling
- Click navigation links
- Smooth scroll to section
- Accounts for fixed header height

---

## 🌐 Deployment

### Option 1: Netlify (Recommended)
1. Push files to GitHub
2. Connect to Netlify
3. Auto-deploys on push
4. Custom domain support

### Option 2: Vercel
1. Create Vercel account
2. Import GitHub repository
3. One-click deployment
4. Fast global CDN

### Option 3: Shared Hosting
1. Upload files via FTP
2. No build process needed
3. Works with any host
4. Videos should be optimized

### Option 4: AWS/GCP/Azure
1. Upload to S3/Cloud Storage
2. Configure CloudFront/CDN
3. Enable caching for videos
4. Set up SSL certificate

---

## 📊 Performance Tips

### Image Optimization
- JPEGs are smaller than PNGs
- Use WebP format if possible
- Compress images online

### Video Optimization
- Consider MP4 codec
- Keep videos under 10MB if possible
- Use CDN for video delivery
- Test on slower connections

### Caching Strategy
```
Cache videos: 1 month
Cache CSS/JS: 1 week
Cache HTML: No cache (always fresh)
```

---

## ♿ Accessibility

Website includes:
- ✅ Semantic HTML
- ✅ ARIA labels where needed
- ✅ Keyboard navigation
- ✅ Color contrast compliance
- ✅ Mobile-friendly touch targets
- ✅ Video captions (recommended to add)

---

## 🔐 Security

- No sensitive data stored
- Forms don't process server-side (add backend)
- HTTPS recommended for production
- Contact form should integrate with email service

---

## 📞 Support & Maintenance

### Regular Updates Needed
1. Update contact information
2. Refresh project photos/videos
3. Add new testimonials
4. Update pricing seasonally
5. Monitor form submissions

### Browser Support
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile browsers (iOS Safari, Chrome Mobile)

---

## 🚨 Common Issues & Fixes

### Videos Not Playing
**Problem:** Videos not loading or playing
**Solutions:**
- Check file paths in HTML
- Ensure videos are in `images/` folder
- Test with different video format
- Check browser compatibility

### Layout Breaking on Mobile
**Problem:** Layout not responsive
**Solutions:**
- Clear browser cache
- Test in incognito mode
- Use responsive design mode (F12)
- Check viewport meta tag

### Forms Not Working
**Problem:** Form submission not working
**Solutions:**
- Backend integration needed for actual submission
- Check browser console for errors
- Verify field IDs match in HTML/JS

---

## 📈 Analytics Setup

Add Google Analytics:
```html
<!-- In <head> -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_ID');
</script>
```

---

## 🎁 Bonus Features Added

1. **Auto-playing carousel** - Shows builds every 6 seconds
2. **Video play button** - Hover effect on about video
3. **Keyboard controls** - Arrow keys in carousel
4. **Toast notifications** - Form feedback
5. **Smooth page transitions** - Better UX
6. **Enhanced mobile menu** - Better touch experience
7. **Animated loader** - Professional first impression
8. **Easter egg** - Click logo 5 times for surprise!

---

## 📝 License

This website is created for Shreeram Builders & Developers. All rights reserved.

---

## 🤝 Contact

**For technical support or inquiries:**
- 📱 WhatsApp: [+91 85919 82619](https://wa.me/918591982619)
- 📧 Email: shreerambuildersndevelopers@gmail.com
- 📍 Location: Diamond Market, Opp. Umroli Station, Palghar
- 🔗 Instagram: [@shreeram_builders_](https://instagram.com/shreeram_builders_)

---

## ✅ Checklist for Going Live

- [ ] Update all phone numbers and emails
- [ ] Upload high-quality logo
- [ ] Replace all video files
- [ ] Update project pricing
- [ ] Add Google Maps location
- [ ] Set up form backend (email integration)
- [ ] Configure analytics
- [ ] Set up SSL certificate (HTTPS)
- [ ] Test on mobile devices
- [ ] Test form submissions
- [ ] Optimize images/videos
- [ ] Set up CDN
- [ ] Configure caching
- [ ] Submit to Google Search Console
- [ ] Add XML sitemap

---

**Made with ❤️ for Shreeram Builders & Developers**

*Building Dreams into Reality* 🏛️
