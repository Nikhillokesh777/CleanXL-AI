# SmartExcel Cleaner — Frontend

A premium SaaS frontend for AI-powered Excel data cleaning, built with React + Vite + Tailwind CSS + Framer Motion.

## Tech Stack

- **React 18** — UI library
- **Vite** — Build tool
- **Tailwind CSS v3** — Utility-first styling
- **Framer Motion** — Animations
- **React Router v6** — Client-side routing
- **React Dropzone** — Drag & drop file upload
- **Lucide React** — Icons
- **Axios** — HTTP client

## Getting Started

```bash
cd frontend
npm install
npm run dev
```

Open the local URL printed by Vite.

## Project Structure

```
src/
├── assets/          # Static resources
├── components/
│   ├── common/      # Button, Card, Modal, Toast, etc.
│   ├── layout/      # Navbar, Footer, Sidebar
│   ├── upload/      # UploadArea, FileCard, UploadProgress
│   ├── processing/  # AnimatedLoader, ProcessingSteps
│   ├── results/     # StatisticsCard, DownloadCard, SuccessAnimation
│   └── home/        # Hero, Features, CTA, Testimonials
├── pages/           # Home, Upload, Processing, Results, About, Contact
├── layouts/         # MainLayout, DashboardLayout
├── routes/          # AppRoutes (lazy-loaded)
├── services/        # api.js, uploadService.js, downloadService.js
├── context/         # UploadContext, ThemeContext
├── hooks/           # useUpload, useDownload, useToast
├── utils/           # constants, helpers, validators, formatter
└── styles/          # globals.css
```

## Backend Integration

Set `VITE_API_URL` in a `.env` file to point to your FastAPI backend:

```env
VITE_API_URL=https://cleanxl-ai.onrender.com
```

Expected API endpoints:
- `POST /api/upload` — Upload file, returns `{ file_id }`
- `GET /api/download/:file_id` — Download cleaned file
