# My Website — React Migration

This repository contains a Vite + React scaffold for migrating your existing static site into React components.

Quick start (PowerShell):

```powershell
Set-Location -Path "d:\1. Projects\My-Website-React"
npm install
npm run dev
```

What's included:
- Vite + React project
- Basic routing with `react-router-dom`
- `Header` component and placeholder pages for Home, About, Blog, Contact
- `src/styles/header.css` — a starter header stylesheet (you can replace with your original `header.css`)

Next steps:
1. Copy your original CSS files into `src/styles` and images into `public/images`.
2. Replace placeholder page contents with the HTML from your existing files (convert to JSX where needed).
3. Port `header.js` behaviour into `Header.jsx` using hooks (I can do that next).
