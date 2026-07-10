"""Centralized Loguru logger configuration."""

import sys
import io
from pathlib import Path
from loguru import logger


def setup_logger(log_dir: str = "logs") -> None:
    """Configure Loguru with console and rotating file sinks."""
    Path(log_dir).mkdir(parents=True, exist_ok=True)

    logger.remove()

    # Force UTF-8 on Windows console to avoid cp1252 UnicodeEncodeError
    utf8_stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8", errors="replace")

    logger.add(
        utf8_stdout,
        level="INFO",
        format="<green>{time:YYYY-MM-DD HH:mm:ss}</green> | <level>{level: <8}</level> | <cyan>{name}</cyan>:<cyan>{line}</cyan> - <level>{message}</level>",
        colorize=True,
    )

    # File — rotating daily, kept 30 days
    logger.add(
        f"{log_dir}/app_{{time:YYYY-MM-DD}}.log",
        level="DEBUG",
        format="{time:YYYY-MM-DD HH:mm:ss} | {level: <8} | {name}:{line} - {message}",
        rotation="00:00",
        retention="30 days",
        compression="zip",
        enqueue=True,
        encoding="utf-8",
    )

    # Separate error log
    logger.add(
        f"{log_dir}/errors.log",
        level="ERROR",
        format="{time:YYYY-MM-DD HH:mm:ss} | {level: <8} | {name}:{line} - {message}\n{exception}",
        rotation="10 MB",
        retention="60 days",
        compression="zip",
        enqueue=True,
        encoding="utf-8",
    )


__all__ = ["logger", "setup_logger"]
