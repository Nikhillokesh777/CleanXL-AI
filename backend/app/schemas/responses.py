"""Pydantic response schemas."""

from typing import Any
from pydantic import BaseModel


class CleaningReport(BaseModel):
    rows_before: int
    rows_after: int
    duplicates_removed: int
    empty_rows_removed: int
    empty_columns_removed: int
    missing_values_fixed: int
    columns_renamed: int
    date_formats_corrected: int
    whitespace_cells_cleaned: int
    special_chars_cleaned: int
    processing_time: str
    quality_score_before: int
    quality_score_after: int


class UploadResponse(BaseModel):
    success: bool
    file_id: str
    download_url: str
    report: CleaningReport


class DownloadInfo(BaseModel):
    file_id: str
    filename: str
    download_url: str


class HealthResponse(BaseModel):
    status: str
    version: str


class ErrorResponse(BaseModel):
    success: bool = False
    message: str
    detail: Any = None
