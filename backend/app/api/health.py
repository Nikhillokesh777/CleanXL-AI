"""Health check endpoint."""

from fastapi import APIRouter
from app.schemas.responses import HealthResponse
from app.config import get_settings

router = APIRouter(tags=["Health"])
settings = get_settings()


@router.get("/health", response_model=HealthResponse, summary="Health Check")
async def health_check() -> HealthResponse:
    """Returns service health status."""
    return HealthResponse(status="healthy", version=settings.app_version)
