# Designsyncs CRM

A production-ready, full-stack CRM application optimized for deployment on Vercel. Features include secure authentication, client management, and a task board system.

## Features
- **Monorepo Architecture**: Unified codebase for frontend and backend.
- **Authentication**: Secure JWT-based registration and login.
- **Client Management**: Full CRUD for client leads and active accounts.
- **Task System**: Kanban-style task management linked to specific clients.
- **Responsive UI**: Modern interface built with React, Tailwind CSS, and Lucide Icons.
- **Vercel Optimized**: Pre-configured `vercel.json` for serverless functions and SPA routing.

## Prerequisites
- Node.js (v18 or higher)
- MongoDB Atlas account (for database)
- Vercel account (for deployment)

## Local Installation

1.  **Clone the repository**:
    `git clone <repository-url>`
    `cd designsyncs-crm`

2.  **Install all dependencies**:
    `npm run install-all`

3.  **Environment Setup**:
    - Create a `.env` file in the root directory (based on `.env.example`).
    - Add your `MONGODB_URI` and `JWT_SECRET`.

4.  **Run Locally**:
    - Start backend and frontend concurrently:
    `npm run dev`

## Deployment on Vercel

1.  **Push code to GitHub/GitLab/Bitbucket**.
2.  **Import to Vercel**:
    - Connect your repository.
    - Vercel will automatically detect the settings from `vercel.json`.
3.  **Environment Variables**:
    - In Vercel Dashboard, go to **Settings > Environment Variables**.
    - Add `MONGODB_URI` and `JWT_SECRET`.
4.  **Build Settings**:
    - **Build Command**: `npm run build`
    - **Output Directory**: `client/dist`
5.  **Deploy**.

## Troubleshooting
- **404 on Refresh**: This is handled by the `rewrites` in `vercel.json`. If you move files, ensure the `rewrites` still point to the correct locations.
- **CORS Error**: Ensure the backend `cors()` middleware is active and that your API requests use relative paths (e.g., `/api/auth/login`) so Vercel's proxy handles them.
- **Database Connection**: Ensure your MongoDB Atlas IP Whitelist includes `0.0.0.0/0` to allow Vercel's serverless functions to connect.

## Project Structure
- `client/`: React + Vite frontend.
- `server/`: Express + Node.js backend.
- `server/api/index.js`: Main entry point for Vercel Serverless.
- `vercel.json`: Deployment configuration.
