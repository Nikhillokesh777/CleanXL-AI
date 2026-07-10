"""Detect and standardize date columns to YYYY-MM-DD."""

import pandas as pd
from dateutil import parser as dateutil_parser
from app.utils.constants import OUTPUT_DATE_FORMAT
from app.utils.logger import logger


def _try_parse_date(value: str) -> str | None:
    """Attempt to parse a string as a date, return formatted string or None."""
    try:
        dt = dateutil_parser.parse(str(value), dayfirst=False)
        return dt.strftime(OUTPUT_DATE_FORMAT)
    except (ValueError, OverflowError, TypeError):
        return None


def _is_date_column(series: pd.Series, sample_size: int = 20) -> bool:
    """Heuristic: check if >60% of non-null sample values parse as dates."""
    non_null = series.dropna().astype(str)
    if len(non_null) == 0:
        return False
    sample = non_null.head(sample_size)
    parsed = sum(1 for v in sample if _try_parse_date(v) is not None)
    return (parsed / len(sample)) >= 0.6


def standardize_dates(df: pd.DataFrame) -> tuple[pd.DataFrame, int]:
    """
    Detect object columns that look like dates and convert them to YYYY-MM-DD.

    Returns:
        Cleaned DataFrame and count of corrected date values.
    """
    corrected = 0

    for col in df.select_dtypes(include=["object"]).columns:
        if not _is_date_column(df[col]):
            continue

        original = df[col].copy()
        df[col] = df[col].apply(
            lambda x: _try_parse_date(x) if pd.notna(x) and str(x).strip() else x
        )
        changed = (df[col] != original).sum()
        corrected += int(changed)
        if changed:
            logger.debug(f"Column '{col}': standardized {changed} date values")

    return df, corrected
