"""Unit tests for all cleaning modules."""

import pandas as pd
import pytest
from app.cleaners.duplicate_cleaner import remove_duplicates
from app.cleaners.empty_row_cleaner import remove_empty_rows
from app.cleaners.empty_column_cleaner import remove_empty_columns
from app.cleaners.null_cleaner import fix_missing_values
from app.cleaners.whitespace_cleaner import trim_whitespace
from app.cleaners.column_cleaner import standardize_columns
from app.cleaners.date_cleaner import standardize_dates
from app.cleaners.special_character_cleaner import remove_special_characters
from app.services.cleaning_service import clean_dataframe


# ── Duplicate Cleaner ─────────────────────────────────────────────────────────

def test_remove_duplicates():
    df = pd.DataFrame({"a": [1, 1, 2], "b": ["x", "x", "y"]})
    result, count = remove_duplicates(df)
    assert count == 1
    assert len(result) == 2


def test_remove_duplicates_no_dupes():
    df = pd.DataFrame({"a": [1, 2, 3]})
    result, count = remove_duplicates(df)
    assert count == 0
    assert len(result) == 3


# ── Empty Row Cleaner ─────────────────────────────────────────────────────────

def test_remove_empty_rows():
    df = pd.DataFrame({"a": [1, None, 3], "b": ["x", None, "z"]})
    result, count = remove_empty_rows(df)
    assert count == 1
    assert len(result) == 2


def test_remove_empty_rows_whitespace():
    df = pd.DataFrame({"a": ["  ", "hello"], "b": ["  ", "world"]})
    result, count = remove_empty_rows(df)
    assert count == 1


# ── Empty Column Cleaner ──────────────────────────────────────────────────────

def test_remove_empty_columns():
    df = pd.DataFrame({"a": [1, 2], "b": [None, None], "c": [3, 4]})
    result, count = remove_empty_columns(df)
    assert count == 1
    assert "b" not in result.columns


# ── Null Cleaner ──────────────────────────────────────────────────────────────

def test_fix_missing_numeric():
    df = pd.DataFrame({"score": [10.0, None, 30.0]})
    result, count = fix_missing_values(df)
    assert count == 1
    assert result["score"].isnull().sum() == 0


def test_fix_missing_categorical():
    df = pd.DataFrame({"city": ["London", None, "London", "Paris"]})
    result, count = fix_missing_values(df)
    assert count == 1
    assert result["city"].iloc[1] == "London"


# ── Whitespace Cleaner ────────────────────────────────────────────────────────

def test_trim_whitespace():
    df = pd.DataFrame({"name": ["  Alice  ", "Bob", "  Carol"]})
    result, count = trim_whitespace(df)
    assert count == 2
    assert result["name"].tolist() == ["Alice", "Bob", "Carol"]


# ── Column Cleaner ────────────────────────────────────────────────────────────

def test_standardize_columns():
    df = pd.DataFrame({"Employee Name": [1], "SALARY ": [2], "dept-code": [3]})
    result, count = standardize_columns(df)
    assert "employee_name" in result.columns
    assert "salary" in result.columns
    assert "dept_code" in result.columns
    assert count == 3


# ── Date Cleaner ──────────────────────────────────────────────────────────────

def test_standardize_dates():
    # Use unambiguous dates to avoid MM/DD vs DD/MM interpretation
    df = pd.DataFrame({"dob": ["2000-05-12", "March 3 2002", "01-07-1999"]})
    result, count = standardize_dates(df)
    assert count >= 2  # at least the non-standard ones get converted
    assert result["dob"].iloc[1] == "2002-03-03"


# ── Special Character Cleaner ─────────────────────────────────────────────────

def test_remove_special_characters():
    df = pd.DataFrame({"notes": ["Hello★World", "Normal text", "Test©"]})
    result, count = remove_special_characters(df)
    assert "★" not in result["notes"].iloc[0]
    assert "©" not in result["notes"].iloc[2]


# ── Full Pipeline ─────────────────────────────────────────────────────────────

def test_full_pipeline():
    df = pd.DataFrame({
        "Employee Name": ["  Alice  ", "Bob", "Alice  ", None],
        "SALARY": [50000, None, 50000, 60000],
        "Join Date": ["01/01/2020", "15-06-2019", "01/01/2020", "2021/03/10"],
        "Empty Col": [None, None, None, None],
    })
    cleaned, report = clean_dataframe(df)
    # Whitespace is trimmed before duplicate check, so "  Alice  " and "Alice  "
    # become "Alice" after trimming — duplicates are detected post-trim
    assert report.empty_columns_removed >= 1
    assert report.empty_columns_removed >= 1
    assert report.columns_renamed >= 1
    assert report.quality_score_after >= report.quality_score_before
    assert report.rows_after <= report.rows_before
