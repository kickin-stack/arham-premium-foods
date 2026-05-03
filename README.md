# Arham Premium Foods — Full-Stack E-commerce Starter

A simple full-stack starter for an organic food store.

## Stack
- Frontend: HTML, CSS, JavaScript
- Backend: Node.js + Express

## Features
- Product API (`GET /api/products`)
- Orders API (`POST /api/orders`, `GET /api/orders`)
- Product grid with categories and images
- Cart sidebar with quantity controls
- Checkout form + order summary
- Place order flow connected to backend
- Responsive green/beige/white storefront theme

## Run locally
1. Install dependencies:
   ```bash
   npm install
   ```
2. Start server:
   ```bash
   npm start
   ```
3. Open:
   `http://localhost:3000`

## Project structure
- `server.js` — Express server + API routes
- `public/index.html` — storefront UI + cart + checkout logic
