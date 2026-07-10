# Smart Excel Data Cleaner — Backend

Production-ready FastAPI backend for automated Excel/CSV data cleaning.

## Tech Stack

- **Python 3.12+** · **FastAPI** · **Uvicorn** · **Pandas** · **OpenPyXL**
- **Pydantic v2** · **Loguru** · **python-dateutil** · **aiofiles**

---

## Installation

### 1. Create & activate virtual environment

```bash
cd backend
python -m venv venv

# Windows
venv\Scripts\activate

# macOS / Linux
source venv/bin/activate
```

### 2. Install dependencies

```bash
pip install -r requirements.txt
```

### 3. Configure environment

Edit `.env` if needed (defaults work out of the box):

```env
APP_NAME=Smart Excel Data Cleaner
PORT=8000
CORS_ORIGINS=http://localhost:5173
MAX_FILE_SIZE_MB=100
```

### 4. Run the server

```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

Server starts at → **http://localhost:8000**

Interactive docs → **http://localhost:8000/docs**

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/health` | Health check |
| POST | `/api/upload` | Upload & clean file |
| GET | `/api/download/{file_id}` | Download cleaned Excel |
| GET | `/api/report/{file_id}` | Get cleaning report JSON |

### Upload Example

```bash
curl -X POST http://localhost:8000/api/upload \
  -F "file=@your_data.xlsx"
```

Response:
```json
{
  "success": true,
  "file_id": "abc123",
  "download_url": "/api/download/abc123",
  "report": {
    "rows_before": 1200,
    "rows_after": 1153,
    "duplicates_removed": 34,
    "missing_values_fixed": 19,
    "quality_score_before": 63,
    "quality_score_after": 98,
    "processing_time": "1.24s"
  }
}
```

---

## Running Tests

```bash
pytest tests/ -v
```

---

## Folder Structure

```
backend/
├── app/
│   ├── api/            # Route handlers
│   ├── cleaners/       # Individual cleaning modules
│   ├── services/       # Business logic & orchestration
│   ├── schemas/        # Pydantic request/response models
│   ├── utils/          # Logger, constants, helpers
│   ├── config.py       # Settings (pydantic-settings)
│   └── main.py         # App factory & entry point
├── uploads/            # Raw uploaded files
├── outputs/            # Cleaned Excel files
├── reports/            # JSON cleaning reports
├── logs/               # Rotating log files
└── tests/              # Pytest unit tests
```

---

## Adding Future AI Services

Drop a new service into `app/services/` and inject it into the cleaning pipeline in `cleaning_service.py`:

```python
# app/services/ai_recommendation_service.py
def get_ai_recommendations(df: pd.DataFrame) -> list[str]: ...

# app/services/outlier_detection_service.py
def detect_outliers(df: pd.DataFrame) -> dict: ...
```

No changes to existing architecture required.

---

## Troubleshooting

| Issue | Fix |
|-------|-----|
| `ModuleNotFoundError` | Activate venv: `venv\Scripts\activate` |
| CORS error from frontend | Check `CORS_ORIGINS` in `.env` |
| File not found on download | File may have been deleted; re-upload |
| Port already in use | Change `PORT` in `.env` or kill the process |
