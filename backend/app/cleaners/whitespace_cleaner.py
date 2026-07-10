"""Trim leading/trailing whitespace from all string columns."""

import pandas as pd
from app.utils.logger import logger


def trim_whitespace(df: pd.DataFrame) -> tuple[pd.DataFrame, int]:
    """
    Strip leading and trailing whitespace from every object/string column.

    Returns:
        Cleaned DataFrame and count of cells that were trimmed.
    """
    cleaned_cells = 0

    for col in df.select_dtypes(include=["object"]).columns:
        original = df[col].copy()
        df[col] = df[col].apply(lambda x: x.strip() if isinstance(x, str) else x)
        changed = (df[col] != original).sum()
        cleaned_cells += int(changed)

    if cleaned_cells:
        logger.debug(f"Whitespace trimmed in {cleaned_cells} cells")
    return df, cleaned_cells
