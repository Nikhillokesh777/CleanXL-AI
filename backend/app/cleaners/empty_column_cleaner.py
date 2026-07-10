"""Remove columns that contain only null values."""

import pandas as pd
from app.utils.logger import logger


def remove_empty_columns(df: pd.DataFrame) -> tuple[pd.DataFrame, int]:
    """
    Drop columns where every value is null.

    Returns:
        Cleaned DataFrame and count of removed columns.
    """
    before = len(df.columns)
    df = df.dropna(axis=1, how="all")
    removed = before - len(df.columns)
    if removed:
        logger.debug(f"Empty columns removed: {removed}")
    return df, removed
