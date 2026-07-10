"""Excel export service — writes a styled, production-quality .xlsx file."""

from pathlib import Path
import pandas as pd
from openpyxl.styles import Font, PatternFill, Alignment, Border, Side
from openpyxl.utils import get_column_letter
from app.utils.logger import logger


_HEADER_FILL = PatternFill(start_color="2563EB", end_color="2563EB", fill_type="solid")
_HEADER_FONT = Font(bold=True, color="FFFFFF", size=11)
_HEADER_ALIGN = Alignment(horizontal="center", vertical="center", wrap_text=True)
_CELL_ALIGN = Alignment(vertical="center")
_THIN_BORDER = Border(
    left=Side(style="thin", color="E2E8F0"),
    right=Side(style="thin", color="E2E8F0"),
    top=Side(style="thin", color="E2E8F0"),
    bottom=Side(style="thin", color="E2E8F0"),
)
_ALT_FILL = PatternFill(start_color="F8FAFC", end_color="F8FAFC", fill_type="solid")


def save_cleaned_excel(df: pd.DataFrame, output_path: str) -> None:
    """
    Write the cleaned DataFrame to a styled Excel file.

    Args:
        df: Cleaned pandas DataFrame.
        output_path: Absolute path for the output .xlsx file.
    """
    Path(output_path).parent.mkdir(parents=True, exist_ok=True)

    with pd.ExcelWriter(output_path, engine="openpyxl") as writer:
        df.to_excel(writer, index=False, sheet_name="Cleaned Data")
        ws = writer.sheets["Cleaned Data"]

        # Style header row
        for col_idx, cell in enumerate(ws[1], start=1):
            cell.fill = _HEADER_FILL
            cell.font = _HEADER_FONT
            cell.alignment = _HEADER_ALIGN
            cell.border = _THIN_BORDER

        # Style data rows + auto-width
        for row_idx, row in enumerate(ws.iter_rows(min_row=2), start=2):
            fill = _ALT_FILL if row_idx % 2 == 0 else None
            for cell in row:
                cell.alignment = _CELL_ALIGN
                cell.border = _THIN_BORDER
                if fill:
                    cell.fill = fill

        # Auto-fit column widths
        for col_idx, col_cells in enumerate(ws.columns, start=1):
            max_len = max(
                (len(str(c.value)) if c.value is not None else 0 for c in col_cells),
                default=10,
            )
            ws.column_dimensions[get_column_letter(col_idx)].width = min(max_len + 4, 40)

        # Freeze header row
        ws.freeze_panes = "A2"

    logger.info(f"Cleaned Excel saved: {output_path}")
