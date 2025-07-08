# 💼 Chapa Frontend Developer Test Task

This is a responsive, role-based dashboard application built as part of the Chapa Frontend Developer test assignment. The project simulates real-world user interactions including login, data fetching, protected routing, and smooth UI transitions — all without a backend, using mock APIs.

---

## 🚀 Live Demo

**🔗 Deployed on Vercel:** [https://chapa-test-project.vercel.app/dashboard](https://chapa-test-project.vercel.app/dashboard)

---

## 🛠️ Tech Stack

- **React + Vite**
- **TypeScript**
- **Tailwind CSS** — for modern utility-first styling
- **React Router v6** — with role-based route protection
- **TanStack Query (React Query)** — for API state management
- **MSW (Mock Service Worker)** — to simulate backend endpoints
- **Headless UI** — for transitions and accessibility
- **ApexCharts** — for chart visualizations
- **Heroicons** — for crisp and consistent icons

---

## 👤 User Roles

The app supports three roles:

| Role          | Dashboard Path |
| ------------- | -------------- |
| `user`        | `/dashboard`   |
| `admin`       | `/admin`       |
| `super-admin` | `/super-admin` |

Log in using the following test credentials:

| Email             | Password | Role        |
| ----------------- | -------- | ----------- |
| `test@chapa.com`  | any      | User        |
| `user@chapa.com`  | any      | User        |
| `admin@chapa.com` | any      | Admin       |
| `super@chapa.com` | any      | Super Admin |

> 🔐 Role is detected dynamically via mock API response.

---

## 💡 Features

### ✅ Auth & Routing

- Role-based login & redirection
- Protected routes with context-based auth
- Logout support

### ✅ Dashboard Pages

- Glassmorphic wallet card
- Recent transactions with animation
- Send transaction modal with form
- Chart panel for monthly expenses
- Promo banner with CTA
- Table for transactions and users list
- Responsive design across all screen sizes

### ✅ Mock API (MSW)

- `/api/login` to return role
- `/api/wallet` for user balance
- `/api/transactions` (with in-memory data)
- `/api/transactions/send` adds new transaction

### ✅ UX Enhancements

- Headless UI transitions
- Smooth animated transaction entries
- Blur and gradient styling
- Dark mode theme by default

---

## 📂 Project Structure

src/
├── components/ # Reusable UI pieces
├── context/ # Auth context
├── mocks/ # MSW mock handlers
├── pages/ # Route-level pages (Dashboard, Login, etc.)
├── routes/ # ProtectedRoute wrapper
└── main.tsx # App entry point

---

## ⚙️ Getting Started Locally

```bash
git clone https://github.com/your-username/chapa-frontend-test.git
cd chapa-frontend-test
npm install
npm run dev
```

Make sure to run:
npx msw init public/ --save
If you clone from scratch and need to reinitialize the service worker.
