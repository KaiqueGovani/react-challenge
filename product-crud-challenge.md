## **Task (60 minutes total)**

Build a small React web app for managing a  **Product Catalog** .

The app must allow listing, searching, filtering, creating, editing, and deleting products using a **fake in-memory API** (already provided in `/src/services/productsService.js`).

Requirements:

* Display a table of products (Name, Category, Price, Stock, Rating).
* Implement search (by name) and category filter.
* Allow adding, editing, and deleting products.
* Show loading and error states for all API calls.
* Disable buttons while operations are pending.
* Styling: match the provided mock as closely as possible with CSS only (no UI libraries).

Stretch (if time): persist data with `localStorage` or add sort toggles.

Deliver a working app that can run with `npm start`. Explain your component structure and trade-offs as you code. 

---

## ⚙️ **Bootstrap locally**

Run these commands:

```bash
# 1. Create app
npx create-react-app product-crud

# 2. Enter folder
cd product-crud

# 3. Start dev server once ready
npm start
```

Then add your files:

```bash
src/
 ├─ App.jsx
 ├─ index.css
 ├─ components/
 │    ├─ Header.jsx
 │    ├─ Toolbar.jsx
 │    ├─ ProductTable.jsx
 │    ├─ ProductForm.jsx
 └─ services/
      └─ productsService.js
```

---

💡 *Tips for interview mode*

* Start with reading data (`useEffect` + `getProducts()`).
* Add form last — listing and deleting first wins easy points.
* Keep the CSS inline or in `index.css`; focus on layout match.
* Narrate your thought process aloud (“I’ll use local state here because…”).
* Handle errors with a minimal `<p style={{color:'red'}}>{error}</p>` — simple but effective.
