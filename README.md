# Bright Space Interiors — website starter

A responsive, frontend-only React/Vite website for Bright Space Interiors. The design uses a warm ivory, charcoal and antique-gold palette, restrained motion, a filterable project gallery, image lightbox, service cards, process steps, and WhatsApp-first enquiries.

## Run locally

Requirements: Node.js 20+ recommended.

```bash
npm install
npm run dev
```

Vite prints a local URL (usually `http://localhost:5173`). To make a production build:

```bash
npm run build
npm run preview
```

The production files are created in `dist/`.

## Project structure

```text
bright-space-interiors/
├── public/
│   ├── favicon.png
│   └── images/                 # Supplied logo and handbook project images
├── src/
│   ├── data/site.js            # Business details, services, gallery and process copy
│   ├── App.jsx                 # Page sections and interactions
│   ├── main.jsx                # React entry point
│   └── styles.css              # Responsive visual system and animations
├── index.html                  # SEO metadata and font loading
├── package.json
└── README.md
```

## Content and asset notes

- The wordmark and monogram are cropped from the Bright Space Interiors logo/card supplied for this project.
- Portfolio photography was extracted from the supplied 35-page Falkon Interiors handbook. Before launch, the client should confirm that these photographs and any reused company copy can be published under Bright Space Interiors.
- The website intentionally avoids carrying over unverified Falkon-specific experience counts, dates or guarantees.
- Current contact information is taken from the Bright Space Interiors business card: Upendra Chary Bairoju, +91 88975 57955, brightspaceinteriors09@gmail.com, and the Baidurgam, Hyderabad address. Confirm spelling and postcode with the client before launch.
- The form is frontend-only: submission opens WhatsApp with the visitor's details pre-filled. Nothing is stored or emailed by a backend in this starter project.
- Contact actions avoid fragile desktop mail-app handling: email uses Gmail compose in a browser tab, WhatsApp opens a direct `wa.me` chat, and contact values can be copied. Direct `tel:` calling is exposed on narrow/mobile layouts; desktop visitors are offered WhatsApp and copy instead.
- The supplied address currently generates partial matches in Google Maps rather than a verified business pin. The site has search and directions links based on the address, but ask the client for a Google Maps share link/pin before launch if a precise destination is required.
- Social links and customer testimonials were not provided, so none are invented.

## Before launch

1. Confirm the exact GoDaddy domain and ownership. Do not make DNS changes until the client confirms the right domain.
2. Confirm permission to use handbook photos and any copy under Bright Space Interiors.
3. Verify the address, postcode, phone, email and WhatsApp destination.
4. Ask the client to confirm the service list and final wording.
5. Connect the verified domain at the chosen host. Use the DNS values the host shows and preserve mail-related MX/TXT records.
6. For Vercel, confirm the appropriate plan for this paid commercial website; the Hobby plan is for personal, non-commercial use. Alternatively, choose a host whose plan terms fit the project.
7. Test the site on mobile, submit a test enquiry, check all image loading and metadata, and confirm that HTTPS is active.

## Editing common content

Edit `src/data/site.js` to change contact details, services, process copy, and the portfolio list. Replace image files under `public/images/` if the client supplies better originals. The colors and spacing are centralized near the top of `src/styles.css` as CSS variables.
