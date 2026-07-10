"""Remove duplicate rows, keeping the first occurrence."""

import pandas as pd
from app.utils.logger import logger


def remove_duplicates(df: pd.DataFrame) -> tuple[pd.DataFrame, int]:
    """
    Drop duplicate rows.

    Returns:
        Cleaned DataFrame and count of removed duplicates.
    """
    before = len(df)
    df = df.drop_duplicates(keep="first").reset_index(drop=True)
    removed = before - len(df)
    if removed:
        logger.debug(f"Duplicates removed: {removed}")
    return df, removed
