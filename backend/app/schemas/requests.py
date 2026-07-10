"""Pydantic request schemas."""

from pydantic import BaseModel


class CleaningOptions(BaseModel):
    """Optional per-request cleaning toggles (all enabled by default)."""
    remove_duplicates: bool = True
    remove_empty_rows: bool = True
    remove_empty_columns: bool = True
    fix_missing_values: bool = True
    trim_whitespace: bool = True
    standardize_columns: bool = True
    fix_data_types: bool = True
    standardize_dates: bool = True
    remove_special_chars: bool = True
