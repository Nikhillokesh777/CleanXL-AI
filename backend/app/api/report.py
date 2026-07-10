"""Report endpoint — return the cleaning report for a given file_id."""

from pathlib import Path
from fastapi import APIRouter, HTTPException, status
from app.config import get_settings
from app.schemas.responses import CleaningReport
from app.services.report_service import load_report
from app.utils.logger import logger

router = APIRouter(prefix="/api", tags=["Report"])
settings = get_settings()


@router.get(
    "/report/{file_id}",
    response_model=CleaningReport,
    summary="Get Cleaning Report",
)
async def get_report(file_id: str) -> CleaningReport:
    """Return the detailed cleaning report for a processed file."""
    if "/" in file_id or "\\" in file_id or ".." in file_id:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid file ID.")

    report_path = str(Path(settings.report_dir) / f"report_{file_id}.json")

    try:
        report = load_report(report_path)
    except FileNotFoundError:
        logger.warning(f"Report not found for file_id: {file_id}")
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Report not found for this file ID.",
        )

    return report
