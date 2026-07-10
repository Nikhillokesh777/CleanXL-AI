"""Remove rows where every cell is empty/null."""

import pandas as pd
from app.utils.logger import logger


def remove_empty_rows(df: pd.DataFrame) -> tuple[pd.DataFrame, int]:
    """
    Drop rows that are entirely null or contain only whitespace strings.

    Returns:
        Cleaned DataFrame and count of removed rows.
    """
    before = len(df)

    # Treat whitespace-only strings as null for this check
    mask = df.replace(r"^\s*$", pd.NA, regex=True).isnull().all(axis=1)
    df = df[~mask].reset_index(drop=True)

    removed = before - len(df)
    if removed:
        logger.debug(f"Empty rows removed: {removed}")
    return df, removed
