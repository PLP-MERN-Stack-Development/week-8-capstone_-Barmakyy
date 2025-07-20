# WASH Facility Monitoring System

A full-stack MERN application for tracking, managing, and improving Water, Sanitation, and Hygiene (WASH) standards in health facilities. The platform empowers facility staff, managers, and administrators to monitor compliance, submit reports, and access training resources, ensuring safe and healthy environments for all.

---

## 🚀 Live Demo

[Deployed Application Link](wash-system.vercel.app)  


---

## 📝 Project Description

This project is a comprehensive WASH Facility Monitoring System built with the MERN stack (MongoDB, Express.js, React, Node.js).
**Key features:**

- User authentication and role-based dashboards (Admin, Manager, Staff)
- Facility management and real-time monitoring
- Report submission and automated reporting
- Audit logs and user management (Admin)
- Accessibility and responsive design
- Full testing coverage (unit, integration, E2E)

---

## ⚙️ Setup Instructions

### Prerequisites

- Node.js (v18 or higher)
- MongoDB (local or Atlas)
- pnpm (or npm/yarn)
- Git

### 1. Clone the repository

```sh
git clone <your-repo-url>
cd week-8-capstone_-Barmakyy
```

### 2. Install dependencies

#### Backend

```sh
cd server
pnpm install
```

#### Frontend

```sh
cd ../client
pnpm install
```

### 3. Set up environment variables

- Copy `.env.example` to `.env` in the `server/` directory and fill in your MongoDB URI and JWT secret.

### 4. Run the application

#### Start the backend

```sh
cd server
pnpm dev
```

#### Start the frontend

```sh
cd ../client
pnpm dev
```

### 5. Run tests

- **Backend:** `pnpm test` (in `server/`)
- **Frontend:** `pnpm test` (in `client/`)
- **E2E:** `pnpm cypress:open` (in `client/`)

---

## 📦 Deployment

- The frontend is deployed on Vercel.
- The backend is deployed on Render.
- [Live App Link](wash-system.vercel.app)

---

## 📚 Resources

- [MongoDB Documentation](https://docs.mongodb.com/)
- [Express.js Documentation](https://expressjs.com/)
- [React Documentation](https://react.dev/)
- [Node.js Documentation](https://nodejs.org/en/docs/)
