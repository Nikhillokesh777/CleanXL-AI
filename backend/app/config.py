"""Application configuration loaded from environment variables."""

from functools import lru_cache
from pathlib import Path
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore",  # ignore system env vars that conflict (e.g. DEBUG)
    )

    # App
    app_name: str = "Smart Excel Data Cleaner"
    app_version: str = "1.0.0"
    host: str = "0.0.0.0"
    port: int = 8000

    # Directories
    upload_dir: str = "uploads"
    output_dir: str = "outputs"
    report_dir: str = "reports"
    log_dir: str = "logs"

    # Limits
    max_file_size_mb: int = 100
    allowed_extensions: str = ".csv,.xls,.xlsx"

    # CORS
    cors_origins: str = "http://localhost:5173,http://localhost:3000"

    @property
    def max_file_size_bytes(self) -> int:
        return self.max_file_size_mb * 1024 * 1024

    @property
    def allowed_extensions_list(self) -> list[str]:
        return [e.strip() for e in self.allowed_extensions.split(",")]

    @property
    def cors_origins_list(self) -> list[str]:
        return [o.strip() for o in self.cors_origins.split(",")]

    def ensure_dirs(self) -> None:
        """Create all required directories if they don't exist."""
        for d in [self.upload_dir, self.output_dir, self.report_dir, self.log_dir]:
            Path(d).mkdir(parents=True, exist_ok=True)


@lru_cache
def get_settings() -> Settings:
    return Settings()
