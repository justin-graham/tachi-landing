# Tachi Landing Page

A standalone Next.js landing page for Tachi - the pay-per-crawl protocol for monetizing web content and powering the agentic economy.

## Features

- **Modern React/Next.js**: Built with Next.js 14.2.30 and TypeScript
- **Responsive Design**: Works on desktop and mobile devices
- **Interactive Animations**: Three.js particle systems and canvas animations
- **Local Fonts**: Complete Coinbase font family included locally
- **Self-Contained**: All assets included, no external dependencies
- **Optimized**: Production-ready build (~227kB total)

## Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Deployment

### Vercel (Recommended)
```bash
npm install -g vercel
vercel deploy
```

### Netlify
- Build command: `npm run build`
- Publish directory: `.next`

### Static Export
```bash
# Add to next.config.js: output: 'export'
npm run build
# Deploy the 'out' folder to any static hosting
```

## Structure

- `/pages/index.tsx` - Main landing page
- `/components/` - All React components
- `/public/fonts/` - Coinbase font family
- `/public/images/` - Logo and gallery images
- `/styles/` - CSS files

## Components

- **HeroSection** - Main hero with animated logo
- **TextSection** - Introduction text
- **Animation Sections** - Various Three.js visualizations
- **CreatorsSection** - For content creators and publishers
- **DevelopersPaySection** - For developers building agents
- **CustomFooter** - Newsletter signup and navigation

## Technologies

- Next.js 14.2.30
- React 18
- TypeScript
- Three.js
- CSS-in-JS

## License

This is a standalone version extracted from the main Tachi monorepo.