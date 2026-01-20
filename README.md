# SOHO Outdoor Chairs Website

A modern, responsive website for showcasing and selling outdoor chairs to international customers.

## Features

- **Product Catalog**: Browse and view detailed information about outdoor chairs
- **Product Details**: Comprehensive product pages with specifications and features
- **Blog**: Articles about outdoor furniture, maintenance tips, and design ideas
- **Contact Form**: Easy way for customers to get in touch and request catalogs
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Modern UI**: Beautiful, clean interface built with Tailwind CSS

## Technology Stack

- **Next.js 14**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first CSS framework
- **React Icons**: Beautiful icon library

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

### Building for Production

```bash
npm run build
npm start
```

## Project Structure

```
soho_site/
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Home page
│   ├── products/          # Product pages
│   ├── blog/              # Blog pages
│   ├── contact/           # Contact page
│   └── layout.tsx         # Root layout
├── components/            # React components
│   ├── Navbar.tsx        # Navigation bar
│   └── Footer.tsx        # Footer component
├── public/               # Static assets
└── pic.pdf              # Product catalog PDF
```

## Customization

### Adding Products

Edit the product data in:
- `app/products/page.tsx` - Product list
- `app/products/[id]/page.tsx` - Product details

### Adding Blog Posts

Edit the blog data in:
- `app/blog/page.tsx` - Blog list
- `app/blog/[id]/page.tsx` - Blog post content

### Styling

The site uses Tailwind CSS. Customize colors and styles in `tailwind.config.js`.

## Contact Form

The contact form currently logs submissions to the console. To make it functional:

1. Set up a backend API endpoint
2. Update the form submission handler in `app/contact/page.tsx`
3. Add email service integration (e.g., SendGrid, Mailgun)

## Product Images

Currently, the site uses placeholder images. To add real product images:

1. Place images in the `public/` directory
2. Update image paths in product data
3. Consider using Next.js Image component for optimization

## Deployment

This site can be deployed to:
- **Vercel** (recommended for Next.js)
- **Netlify**
- **AWS Amplify**
- Any Node.js hosting service

## License

All rights reserved.
