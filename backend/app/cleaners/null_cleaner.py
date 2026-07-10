"""Handle missing values: numeric → median, categorical → mode."""

import pandas as pd
from app.utils.logger import logger


def fix_missing_values(df: pd.DataFrame) -> tuple[pd.DataFrame, int]:
    """
    Fill missing values intelligently per column type.

    Returns:
        Cleaned DataFrame and total count of filled cells.
    """
    filled = 0

    for col in df.columns:
        null_count = df[col].isnull().sum()
        if null_count == 0:
            continue

        if pd.api.types.is_numeric_dtype(df[col]):
            median = df[col].median()
            if pd.notna(median):
                df[col] = df[col].fillna(median)
                filled += null_count
                logger.debug(f"Column '{col}': filled {null_count} nulls with median={median:.4g}")
        else:
            mode_vals = df[col].mode()
            if not mode_vals.empty:
                df[col] = df[col].fillna(mode_vals.iloc[0])
                filled += null_count
                logger.debug(f"Column '{col}': filled {null_count} nulls with mode='{mode_vals.iloc[0]}'")

    return df, filled
