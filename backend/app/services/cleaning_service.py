"""Cleaning orchestration service — runs all cleaners in the optimal order."""

import time
import pandas as pd
from app.schemas.requests import CleaningOptions
from app.schemas.responses import CleaningReport
from app.cleaners.duplicate_cleaner import remove_duplicates
from app.cleaners.empty_row_cleaner import remove_empty_rows
from app.cleaners.empty_column_cleaner import remove_empty_columns
from app.cleaners.null_cleaner import fix_missing_values
from app.cleaners.whitespace_cleaner import trim_whitespace
from app.cleaners.column_cleaner import standardize_columns
from app.cleaners.datatype_cleaner import fix_data_types
from app.cleaners.date_cleaner import standardize_dates
from app.cleaners.special_character_cleaner import remove_special_characters
from app.utils.helpers import compute_quality_score
from app.utils.logger import logger


def clean_dataframe(
    df: pd.DataFrame,
    options: CleaningOptions | None = None,
) -> tuple[pd.DataFrame, CleaningReport]:
    """
    Run the full cleaning pipeline on a DataFrame.

    Pipeline order (optimized):
      1. Trim whitespace        — normalize strings before comparisons
      2. Remove duplicates      — accurate after trimming
      3. Remove empty rows      — after trim, whitespace-only rows are caught
      4. Remove empty columns   — structural cleanup
      5. Standardize columns    — rename before type/date work
      6. Standardize dates      — before type inference
      7. Fix data types         — after dates are strings in YYYY-MM-DD
      8. Fix missing values     — after types are correct
      9. Remove special chars   — final text polish

    Returns:
        (cleaned_df, CleaningReport)
    """
    if options is None:
        options = CleaningOptions()

    start = time.perf_counter()
    df_original = df.copy()
    rows_before = len(df)
    score_before, _ = compute_quality_score(df, df)

    duplicates_removed = 0
    empty_rows_removed = 0
    empty_cols_removed = 0
    missing_fixed = 0
    cols_renamed = 0
    dates_corrected = 0
    whitespace_cleaned = 0
    special_chars_cleaned = 0

    logger.info(f"Cleaning started — {rows_before} rows × {len(df.columns)} cols")

    if options.trim_whitespace:
        df, whitespace_cleaned = trim_whitespace(df)

    if options.remove_duplicates:
        df, duplicates_removed = remove_duplicates(df)

    if options.remove_empty_rows:
        df, empty_rows_removed = remove_empty_rows(df)

    if options.remove_empty_columns:
        df, empty_cols_removed = remove_empty_columns(df)

    if options.standardize_columns:
        df, cols_renamed = standardize_columns(df)

    if options.standardize_dates:
        df, dates_corrected = standardize_dates(df)

    if options.fix_data_types:
        df = fix_data_types(df)

    if options.fix_missing_values:
        df, missing_fixed = fix_missing_values(df)

    if options.remove_special_chars:
        df, special_chars_cleaned = remove_special_characters(df)

    elapsed = time.perf_counter() - start
    rows_after = len(df)
    _, score_after = compute_quality_score(df_original, df)

    report = CleaningReport(
        rows_before=rows_before,
        rows_after=rows_after,
        duplicates_removed=duplicates_removed,
        empty_rows_removed=empty_rows_removed,
        empty_columns_removed=empty_cols_removed,
        missing_values_fixed=missing_fixed,
        columns_renamed=cols_renamed,
        date_formats_corrected=dates_corrected,
        whitespace_cells_cleaned=whitespace_cleaned,
        special_chars_cleaned=special_chars_cleaned,
        processing_time=f"{elapsed:.2f}s",
        quality_score_before=score_before,
        quality_score_after=score_after,
    )

    logger.info(
        f"Cleaning complete — {rows_before}→{rows_after} rows | "
        f"quality {score_before}→{score_after} | {elapsed:.2f}s"
    )
    return df, report
