"""Report persistence service — save and retrieve cleaning reports as JSON."""

import json
from pathlib import Path
from app.schemas.responses import CleaningReport
from app.utils.logger import logger


def save_report(report: CleaningReport, report_path: str) -> None:
    """Persist a CleaningReport to a JSON file."""
    Path(report_path).parent.mkdir(parents=True, exist_ok=True)
    with open(report_path, "w", encoding="utf-8") as f:
        json.dump(report.model_dump(), f, indent=2)
    logger.debug(f"Report saved: {report_path}")


def load_report(report_path: str) -> CleaningReport:
    """Load a CleaningReport from a JSON file."""
    path = Path(report_path)
    if not path.exists():
        raise FileNotFoundError(f"Report not found: {report_path}")
    with open(path, "r", encoding="utf-8") as f:
        data = json.load(f)
    return CleaningReport(**data)
