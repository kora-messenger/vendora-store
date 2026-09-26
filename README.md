# Vendora — Professional Shopping Website

![Vendora](https://img.shields.io/badge/Vendora-Store-gold?style=flat-square)

**Vendora** is a professional e-commerce website for a multi-category store: clothes, shoes, bags, phones, accessories, gadgets — plus pizza and food delivery from Vendora Kitchen.

## ✨ Features

- **Modern, professional design** — deep navy + gold palette, Inter typography, fully responsive
- **Product catalog** with category filters, live search, and price/rating sorting
- **Shopping cart** that persists in the browser (localStorage) with a slide-out drawer
- **Food & pizza delivery menu** with its own categories
- **Checkout flow** — delivery details, delivery/pickup, payment method (pay on delivery / bank transfer), free delivery over ₦100,000
- **Order confirmation via WhatsApp** — order details are sent straight to the store's number
- **Contact & About page** with enquiry form

## 📁 Structure

```
index.html      Home (hero, categories, featured, food banner, testimonials)
shop.html       Product catalog with filters & search
food.html       Pizza & food delivery menu
checkout.html   Order form & summary
contact.html    About + contact + enquiry form
css/style.css   Full design system
js/config.js    ⚙️ STORE SETTINGS — phone, WhatsApp, email, address, delivery fee
js/data.js      Products & food menu data (edit to change catalog)
js/app.js       Cart, rendering, checkout logic
assets/img/    All product & hero images (bundled, no external dependencies)
```

## ⚙️ Client Setup (before go-live)

1. Open `js/config.js` and update:
   - `whatsapp` — the store's real WhatsApp number (international format, no `+`)
   - `email`, `phoneDisplay`, `address`, `hours`
   - `deliveryFee` and `freeDeliveryOver` thresholds
2. Update products/menu in `js/data.js` (name, category, price, image URL, description).
3. Replace the placeholder product photos in `assets/img/` with real product photos (same filenames, or update `js/data.js`).

## 🌐 Custom Domain (later)

1. In the repo: **Settings → Pages → Custom domain**, enter e.g. `www.vendora.store`
2. Add a `CNAME` file (GitHub does this automatically) and a `CNAME` DNS record at the domain provider pointing to `<github-username>.github.io`.
3. Wait for the DNS check, then enable **Enforce HTTPS**.

## 🚀 Deployments

The site auto-deploys to GitHub Pages on every push to `main` via `.github/workflows/deploy.yml`.

## 🔒 Payments

Currently: pay on delivery + bank transfer. A Paystack online-card checkout is stubbed in the checkout payment options and can be wired up when the client provides their Paystack keys.

## v1.1.0 — Jumia-style update

- Full-width nav search on every page
- Auto-rotating 3-slide hero carousel with dots and arrows
- Flash Sale section with live midnight countdown and low-stock counters
- Call to Order top strip
- Cookie notice banner
- Policy pages: Terms of Service, Privacy Policy, Returns & Refunds (linked in footer and checkout)
