"""Standardize column names to snake_case."""

import re
import pandas as pd
from app.utils.logger import logger


def standardize_columns(df: pd.DataFrame) -> tuple[pd.DataFrame, int]:
    """
    Normalize column names:
      - Strip whitespace
      - Lowercase
      - Replace spaces, hyphens, dots with underscores
      - Remove consecutive underscores

    Returns:
        Cleaned DataFrame and count of renamed columns.
    """
    renamed = 0
    new_columns: dict[str, str] = {}

    for col in df.columns:
        clean = str(col).strip()
        clean = clean.lower()
        clean = re.sub(r"[\s\-\.]+", "_", clean)
        clean = re.sub(r"[^\w]", "", clean)
        clean = re.sub(r"_+", "_", clean).strip("_")
        clean = clean or f"column_{list(df.columns).index(col)}"

        if clean != str(col):
            renamed += 1
        new_columns[col] = clean

    df = df.rename(columns=new_columns)
    if renamed:
        logger.debug(f"Columns renamed: {renamed}")
    return df, renamed
