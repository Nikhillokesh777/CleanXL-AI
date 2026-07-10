"""File I/O service — read uploaded bytes into DataFrame, save outputs."""

import io
from pathlib import Path
import pandas as pd
from fastapi import HTTPException, status
from app.utils.helpers import get_file_extension, safe_filename
from app.utils.logger import logger


def read_dataframe(content: bytes, filename: str) -> pd.DataFrame:
    """
    Parse raw file bytes into a pandas DataFrame.

    Supports: .csv, .xls, .xlsx
    Raises HTTPException 422 if the file cannot be parsed.
    """
    ext = get_file_extension(filename)
    try:
        if ext == ".csv":
            # Try UTF-8 first, fall back to latin-1
            try:
                df = pd.read_csv(io.BytesIO(content), encoding="utf-8")
            except UnicodeDecodeError:
                df = pd.read_csv(io.BytesIO(content), encoding="latin-1")
        elif ext == ".xls":
            df = pd.read_excel(io.BytesIO(content), engine="xlrd")
        elif ext == ".xlsx":
            df = pd.read_excel(io.BytesIO(content), engine="openpyxl")
        else:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Unsupported extension: {ext}",
            )
    except HTTPException:
        raise
    except Exception as exc:
        logger.error(f"Failed to parse file '{filename}': {exc}")
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail=f"Could not read file. It may be corrupted or in an unsupported format.",
        )

    logger.info(f"File parsed: {filename} → {df.shape[0]} rows × {df.shape[1]} cols")
    return df


def save_file(content: bytes, path: str) -> None:
    """Write raw bytes to disk."""
    Path(path).parent.mkdir(parents=True, exist_ok=True)
    with open(path, "wb") as f:
        f.write(content)


def delete_file(path: str) -> None:
    """Silently delete a file if it exists."""
    try:
        Path(path).unlink(missing_ok=True)
    except Exception as exc:
        logger.warning(f"Could not delete file {path}: {exc}")
