"""Download endpoint — stream the cleaned Excel file to the client."""

from pathlib import Path
from fastapi import APIRouter, HTTPException, status
from fastapi.responses import FileResponse
from app.config import get_settings
from app.utils.logger import logger

router = APIRouter(prefix="/api", tags=["Download"])
settings = get_settings()


@router.get(
    "/download/{file_id}",
    summary="Download Cleaned File",
    response_class=FileResponse,
)
async def download_cleaned_file(file_id: str) -> FileResponse:
    """
    Stream the cleaned Excel file for a given file_id.
    The file is NOT deleted after download to allow re-downloads.
    """
    # Prevent directory traversal
    if "/" in file_id or "\\" in file_id or ".." in file_id:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid file ID.")

    output_path = Path(settings.output_dir) / f"cleaned_{file_id}.xlsx"

    if not output_path.exists():
        logger.warning(f"Download requested for missing file_id: {file_id}")
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Cleaned file not found. It may have expired.",
        )

    logger.info(f"Download served: {file_id}")
    return FileResponse(
        path=str(output_path),
        media_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        filename="cleaned_data.xlsx",
    )
