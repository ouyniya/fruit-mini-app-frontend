# 🥭 Mini Fruit Inventory App — Frontend

A simple React-based frontend for managing fruit inventory. Users can log in, view fruit stock, and manage inventory with authentication support.

## 📷 App Screenshots

![Screenshots](/mini-app-demo.gif)

---

## 🚀 Features

- Login with email & password
- View paginated fruit inventory
- Add new fruit records
- Edit existing fruit records
- Delete fruit records
- Authenticated with Access/Refresh Token

---

## 🛠️ Tech Stack

- **React.js**
- **Axios** – HTTP client
- **Tailwind CSS** – UI styling
- **React Router** – Routing pages
- **Vite** – Development environment
- **Cookies** – Secure refresh token handling
- **Zod** - Validation

---

## 📦 Installation

```bash
git clone https://github.com/ouyniya/fruit-mini-app-frontend.git .
npm install
```

## ▶️ Running the App

```bash
npm run dev
```

App will start at:
`http://localhost:5173`


## 🔗 API Base URL

You can configure this in .env:

```bash
VITE_API_URL=https://your-backend-url/api
VITE_ADMIN_EMAIL=your-admin-email
```


## 📁 Folder Structure

```bash
src/
├── assets/           # Static files like images and icons
├── components/       # Reusable UI components and modals
├── lib/              # Utility libraries and helpers
├── pages/            # Page-level components (routes)
├── routes/           # Route definitions and protected routes
├── services/         # API service modules for backend communication
├── stores/           # State management (e.g., auth)
├── types/            # TypeScript type definitions
├── utils/            # Utility functions, constants, axios setup, validation
```


## 🧪 Auth Flow

- User logs in → Access Token + Refresh Token issued

- Access Token stored in memory (used in headers)

- Refresh Token stored in HTTP-only cookie

- When Access Token expires → App sends request to /refresh-token to get a new one

- Logout clears the cookie and session



## 🤝 Backend API

This app works with the backend at:

https://github.com/ouyniya/fruit-mini-app-backend


---

## Attributions and copyright

### Icons

All icons from SVGRepo are credited below and used
within the bounds of their respective licenses.

Cherry

- CC0 License
- https://www.svgrepo.com/svg/49765/cherry
- SVG Repo



----


# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      ...tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      ...tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      ...tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from "eslint-plugin-react-x";
import reactDom from "eslint-plugin-react-dom";

export default tseslint.config([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs["recommended-typescript"],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```
