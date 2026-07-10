"""Auto-detect and convert columns to their most appropriate data types."""

import pandas as pd
from app.utils.constants import BOOLEAN_TRUE_VALUES, BOOLEAN_FALSE_VALUES
from app.utils.logger import logger


def _try_boolean(series: pd.Series) -> pd.Series | None:
    """Convert a series to boolean if all non-null values are boolean-like."""
    non_null = series.dropna().astype(str).str.lower()
    valid = BOOLEAN_TRUE_VALUES | BOOLEAN_FALSE_VALUES
    if non_null.isin(valid).all() and len(non_null) > 0:
        return series.apply(
            lambda x: True if str(x).lower() in BOOLEAN_TRUE_VALUES
            else (False if str(x).lower() in BOOLEAN_FALSE_VALUES else pd.NA)
        )
    return None


def fix_data_types(df: pd.DataFrame) -> pd.DataFrame:
    """
    Attempt to downcast object columns to numeric or boolean types.
    Uses pandas' built-in inference for numeric conversion.
    """
    for col in df.select_dtypes(include=["object"]).columns:
        # Try boolean first
        bool_series = _try_boolean(df[col])
        if bool_series is not None:
            df[col] = bool_series
            logger.debug(f"Column '{col}' converted to boolean")
            continue

        # Try numeric
        converted = pd.to_numeric(df[col], errors="coerce")
        non_null_original = df[col].dropna()
        if len(non_null_original) > 0 and converted.notna().sum() / len(non_null_original) >= 0.9:
            df[col] = converted
            # Downcast to int if no fractional part
            if (converted.dropna() % 1 == 0).all():
                df[col] = converted.astype("Int64")
            logger.debug(f"Column '{col}' converted to numeric")

    return df
