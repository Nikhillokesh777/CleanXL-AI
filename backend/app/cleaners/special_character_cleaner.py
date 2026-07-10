"""Remove unnecessary special characters from text columns."""

import re
import pandas as pd
from app.utils.logger import logger

# Keep: letters, digits, spaces, common punctuation (.,!?@#$%&-_/:'")
_KEEP_PATTERN = re.compile(r"[^\w\s\.,!?@#\$%&\-_/:'\"\(\)]", flags=re.UNICODE)


def remove_special_characters(df: pd.DataFrame) -> tuple[pd.DataFrame, int]:
    """
    Strip unusual special characters from all string columns.

    Returns:
        Cleaned DataFrame and count of affected cells.
    """
    cleaned = 0

    for col in df.select_dtypes(include=["object"]).columns:
        original = df[col].copy()
        df[col] = df[col].apply(
            lambda x: _KEEP_PATTERN.sub("", str(x)).strip() if isinstance(x, str) else x
        )
        changed = (df[col] != original).sum()
        cleaned += int(changed)

    if cleaned:
        logger.debug(f"Special characters cleaned in {cleaned} cells")
    return df, cleaned
