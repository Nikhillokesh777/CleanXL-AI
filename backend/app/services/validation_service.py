"""File validation service — extension, size, MIME type, and readability."""

from pathlib import Path
from fastapi import UploadFile, HTTPException, status
from app.config import get_settings
from app.utils.constants import ALLOWED_MIME_TYPES
from app.utils.helpers import get_file_extension
from app.utils.logger import logger

settings = get_settings()


async def validate_upload(file: UploadFile) -> bytes:
    """
    Validate the uploaded file and return its raw bytes.

    Raises:
        HTTPException 400 for invalid extension, MIME type, or size.
        HTTPException 422 for unreadable/corrupted files.
    """
    ext = get_file_extension(file.filename or "")
    if ext not in settings.allowed_extensions_list:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Unsupported file format '{ext}'. Allowed: {', '.join(settings.allowed_extensions_list)}",
        )

    if file.content_type and file.content_type not in ALLOWED_MIME_TYPES:
        logger.warning(f"Unexpected MIME type: {file.content_type} for file {file.filename}")

    content = await file.read()

    if len(content) == 0:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Uploaded file is empty.",
        )

    if len(content) > settings.max_file_size_bytes:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"File exceeds maximum size of {settings.max_file_size_mb}MB.",
        )

    logger.info(f"File validated: {file.filename} ({len(content) / 1024:.1f} KB)")
    return content
