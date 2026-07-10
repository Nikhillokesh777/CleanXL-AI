"""Upload endpoint — validate, clean, save, and return results."""

from pathlib import Path
from fastapi import APIRouter, UploadFile, File, HTTPException, status
from app.config import get_settings
from app.schemas.responses import UploadResponse
from app.schemas.requests import CleaningOptions
from app.services.validation_service import validate_upload
from app.services.file_service import read_dataframe, save_file
from app.services.cleaning_service import clean_dataframe
from app.services.excel_service import save_cleaned_excel
from app.services.report_service import save_report
from app.utils.helpers import generate_file_id, safe_filename, get_file_extension
from app.utils.logger import logger

router = APIRouter(prefix="/api", tags=["Upload"])
settings = get_settings()


@router.post(
    "/upload",
    response_model=UploadResponse,
    status_code=status.HTTP_200_OK,
    summary="Upload and Clean File",
)
async def upload_and_clean(
    file: UploadFile = File(..., description="CSV, XLS, or XLSX file to clean"),
) -> UploadResponse:
    """
    Full pipeline:
    1. Validate file
    2. Parse into DataFrame
    3. Run cleaning pipeline
    4. Export styled Excel
    5. Save JSON report
    6. Return statistics
    """
    logger.info(f"Upload received: {file.filename}")

    # 1. Validate
    content = await validate_upload(file)

    # 2. Parse
    df = read_dataframe(content, file.filename or "upload.xlsx")

    # 3. Save raw upload
    file_id = generate_file_id()
    ext = get_file_extension(file.filename or ".xlsx")
    upload_path = str(Path(settings.upload_dir) / f"{file_id}{ext}")
    save_file(content, upload_path)

    # 4. Clean
    cleaned_df, report = clean_dataframe(df, CleaningOptions())

    # 5. Export Excel
    output_path = str(Path(settings.output_dir) / f"cleaned_{file_id}.xlsx")
    save_cleaned_excel(cleaned_df, output_path)

    # 6. Save report
    report_path = str(Path(settings.report_dir) / f"report_{file_id}.json")
    save_report(report, report_path)

    logger.info(f"Upload complete: file_id={file_id}")

    return UploadResponse(
        success=True,
        file_id=file_id,
        download_url=f"/api/download/{file_id}",
        report=report,
    )
