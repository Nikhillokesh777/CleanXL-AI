"""Shared utility helpers."""

import uuid
import re
from pathlib import Path


def generate_file_id() -> str:
    """Generate a unique file identifier."""
    return uuid.uuid4().hex


def safe_filename(filename: str) -> str:
    """Sanitize a filename to prevent directory traversal."""
    name = Path(filename).name
    name = re.sub(r"[^\w\s\-.]", "", name)
    return name or "upload"


def get_file_extension(filename: str) -> str:
    """Return lowercase file extension including the dot."""
    return Path(filename).suffix.lower()


def compute_quality_score(df_before, df_after) -> tuple[int, int]:
    """
    Compute a simple data quality score (0–100) before and after cleaning.
    Score = 100 - (null_ratio * 50) - (duplicate_ratio * 30) - (empty_col_ratio * 20)
    """
    def _score(df) -> int:
        if df.empty:
            return 0
        total_cells = df.size or 1
        null_ratio = df.isnull().sum().sum() / total_cells
        dup_ratio = df.duplicated().sum() / max(len(df), 1)
        empty_col_ratio = (df.isnull().all().sum()) / max(len(df.columns), 1)
        raw = 100 - (null_ratio * 50) - (dup_ratio * 30) - (empty_col_ratio * 20)
        return max(0, min(100, round(raw)))

    return _score(df_before), _score(df_after)
