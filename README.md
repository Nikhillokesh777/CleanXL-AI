# CleanXL AI — Smart Excel Data Cleaner

A production-ready full-stack SaaS application that automatically cleans messy Excel and CSV files using AI-powered data cleaning.

Built by **Nikhil Lokesh**

[![LinkedIn](https://img.shields.io/badge/LinkedIn-Nikhil%20Lokesh-blue)](https://www.linkedin.com/in/nikhil-lokesh-562b022b7/)
[![GitHub](https://img.shields.io/badge/GitHub-Nikhillokesh777-black)](https://github.com/Nikhillokesh777)

---

## Features

- Remove duplicate rows
- Handle missing values (numeric → median, text → mode)
- Standardize column names to snake_case
- Fix and standardize date formats to YYYY-MM-DD
- Remove empty rows and columns
- Trim whitespace from all text fields
- Auto-detect and convert data types
- Remove special characters
- Export styled, production-quality Excel file
- Data quality score before & after cleaning

---

## Tech Stack

### Frontend
- React 18 + Vite
- Tailwind CSS v3
- Framer Motion
- React Router v6
- Axios + React Dropzone
- Lucide React Icons

### Backend
- Python 3.12+ + FastAPI
- Uvicorn
- Pandas + NumPy
- OpenPyXL
- Pydantic v2
- Loguru

---

## Project Structure

```
CleanXL-AI/
├── frontend/       # React + Vite frontend
└── backend/        # FastAPI backend
```

---

## Getting Started

### Backend

```bash
cd backend
python -m venv venv
venv\Scripts\activate        # Windows
source venv/bin/activate     # macOS/Linux
pip install -r requirements.txt
uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Open → **http://localhost:5173**

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/health` | Health check |
| POST | `/api/upload` | Upload & clean file |
| GET | `/api/download/{file_id}` | Download cleaned Excel |
| GET | `/api/report/{file_id}` | Get cleaning report |

---

## Environment Variables

### Backend — `backend/.env`
```env
PORT=8000
CORS_ORIGINS=http://localhost:5173
MAX_FILE_SIZE_MB=100
```

### Frontend — `frontend/.env`
```env
VITE_API_URL=http://localhost:8000
```

---

## License

MIT © Nikhil Lokesh
