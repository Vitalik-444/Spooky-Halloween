# 🎃 Spooky Halloween — Dark Coven & Curiosities

A themed single-page e-commerce storefront for Halloween goods, built with React, TypeScript, and Tailwind CSS. The project features a full shopping flow — catalog browsing, filtering, favorites, cart, coupons, and a simulated checkout — wrapped in an immersive gothic visual style.

> **Demo notice:** the payment gateway and order dispatch are simulated. No real transactions are processed.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)
- [Project Structure](#project-structure)
- [Routes](#routes)
- [State Management](#state-management)
- [Data Model](#data-model)
- [Pricing Rules and Coupons](#pricing-rules-and-coupons)
- [Design System](#design-system)
- [Deployment](#deployment)
- [Roadmap](#roadmap)
- [License](#license)

---

## Features

**Storefront**
- Hero section, featured categories, and a "most popular" product showcase on the home page
- Four product categories: Haunted Decorations, Costumes & Masks, Spooky Lighting, Halloween Accessories
- Product detail pages with ratings, reviews, stock information, and badges
- Newsletter sign-up block and informational pages

**Catalog**
- Full-text search by product name
- Category filter
- Price range filter (min / max)
- Sorting by popularity, newest, price ascending, and price descending
- Filter state synchronized with URL search parameters

**Cart and Favorites**
- Slide-out cart drawer and a dedicated cart page
- Quantity management capped by available stock
- "Book of Shadows" favorites list
- Cart, favorites, and applied coupon persisted in `localStorage`
- Toast notifications for user actions

**Checkout**
- Shipping form with client-side validation (required fields and email format)
- Order manifest summary with subtotal, discount, shipping, and total
- Simulated order confirmation

**Experience**
- Animated transitions powered by Framer Motion
- Respect for the user's reduced-motion preference
- Custom SVG icons and decorative elements (jack-o'-lantern, cauldron, cobwebs)
- Inline SVG fallback artwork for product images that fail to load
- Responsive layout for mobile, tablet, and desktop

---

## Tech Stack

| Layer | Technology |
| --- | --- |
| UI library | React 18 |
| Language | TypeScript 5 (strict mode) |
| Build tool | Vite 6 |
| Styling | Tailwind CSS 4 (`@tailwindcss/vite`) |
| Routing | React Router 6 (`HashRouter`) |
| Animation | Framer Motion 11 |
| Icons | Lucide React + custom SVG components |
| Typography | Cinzel, Cinzel Decorative, Creepster, Plus Jakarta Sans (Google Fonts) |

---

## Getting Started

### Prerequisites

- Node.js 18 or newer
- npm 9 or newer

### Installation

```bash
git clone https://github.com/<your-username>/spooky-halloween.git
cd spooky-halloween
npm install
```

### Run the development server

```bash
npm run dev
```

The app will be available at the URL printed by Vite (by default `http://localhost:5173`).

### Create a production build

```bash
npm run build
npm run preview
```

---

## Available Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Starts the Vite development server with hot module replacement |
| `npm run build` | Runs the TypeScript type check, then builds the production bundle into `dist/` |
| `npm run preview` | Serves the production build locally for verification |

---

## Project Structure

```
spooky-halloween/
├── public/
│   └── img/                  Product, category, and hero images
├── src/
│   ├── components/
│   │   └── HalloweenDecor.tsx   Decorative SVG components
│   ├── App.tsx               Pages, layout, and route definitions
│   ├── data.ts               Product catalog, categories, shipping constants
│   ├── store.tsx             Global cart / favorites / coupon state
│   ├── types.ts              Shared TypeScript types
│   ├── index.css             Tailwind theme tokens and global styles
│   └── main.tsx              Application entry point and providers
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

---

## Routes

The application uses `HashRouter`, which makes it deployable to any static host without server-side rewrite rules.

| Path | Page |
| --- | --- |
| `/` | Home |
| `/shop` | Catalog with search, filters, and sorting |
| `/product/:id` | Product details |
| `/favorites` | Saved items |
| `/cart` | Cart overview |
| `/checkout` | Checkout form and order summary |
| `/info/:slug` | Informational pages |
| `*` | Fallback to the informational page |

---

## State Management

Application state is handled by a single React Context provider (`StoreProvider` in `src/store.tsx`), exposed through the `useStore()` hook.

It manages:

- **Cart** — product IDs mapped to quantities, enforced against stock
- **Favorites** — a list of product IDs
- **Coupon** — the currently applied promo code
- **UI state** — cart drawer visibility and toast messages
- **Derived values** — item count, subtotal, discount, shipping, and total

Persistent data is stored in `localStorage` under the keys `sh-cart`, `sh-favs`, and `sh-coupon`, through a small generic `useLS` hook with safe fallbacks when storage is unavailable.

---

## Data Model

Defined in `src/types.ts`:

```ts
type Category =
  | "Haunted Decorations"
  | "Costumes & Masks"
  | "Spooky Lighting"
  | "Halloween Accessories";

interface Product {
  id: string;
  name: string;
  category: Category;
  price: number;
  original?: number;
  description: string;
  image: string;
  rating: number;
  reviews: number;
  badge?: string;
  stock: number;
  added: number;
  popularity: number;
}

interface CartItem {
  product: Product;
  qty: number;
}
```

To add or edit products, modify the catalog in `src/data.ts` and place the corresponding image in `public/img/`.

---

## Pricing Rules and Coupons

- Shipping is a flat fee of **6.95**, waived for orders of **75** or more (calculated after discount)
- Coupon codes are case-insensitive and validated against a predefined list in `src/store.tsx`
- Supported codes apply percentage discounts to the subtotal; the `FREESHIP` code waives the shipping fee instead

Shipping thresholds are defined by `FREE_SHIP` and `SHIP` in `src/data.ts`; coupon rates are defined in the `COUPON_RATES` map in `src/store.tsx`.

---

## Design System

Theme tokens are declared in `src/index.css` using Tailwind CSS 4's `@theme` directive.

| Token | Value | Usage |
| --- | --- | --- |
| `ink` | `#070509` | Page background |
| `coal` | `#120e19` | Surfaces |
| `crypt` | `#1b1526` | Cards and panels |
| `pump` | `#ff7518` | Primary accent (pumpkin orange) |
| `ember` | `#ff9d00` | Secondary accent |
| `witch` | `#a855f7` | Purple highlights |
| `blood` | `#991b1b` | Danger / emphasis |
| `cream` | `#f5eedb` | Primary text |
| `ash` | `#9e96aa` | Muted text |

---

## Deployment

The project builds to static files and can be hosted anywhere that serves static content (Vercel, Netlify, GitHub Pages, Cloudflare Pages, etc.).

```bash
npm run build
```

Deploy the generated `dist/` directory. Because the router is hash-based, no additional server configuration is required. If the site is served from a sub-path (for example on GitHub Pages), set the `base` option in `vite.config.ts` accordingly.

---

