"""Application-wide constants."""

ALLOWED_MIME_TYPES: set[str] = {
    "text/csv",
    "application/vnd.ms-excel",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "application/octet-stream",  # some browsers send this for xlsx
}

ALLOWED_EXTENSIONS: set[str] = {".csv", ".xls", ".xlsx"}

DATE_FORMATS: list[str] = [
    "%Y-%m-%d", "%d/%m/%Y", "%m/%d/%Y", "%d-%m-%Y", "%m-%d-%Y",
    "%Y/%m/%d", "%d/%m/%y", "%m/%d/%y", "%d-%m-%y",
    "%B %d %Y", "%b %d %Y", "%d %B %Y", "%d %b %Y",
    "%Y%m%d",
]

BOOLEAN_TRUE_VALUES: set[str] = {"true", "yes", "1", "y", "t"}
BOOLEAN_FALSE_VALUES: set[str] = {"false", "no", "0", "n", "f"}

OUTPUT_DATE_FORMAT: str = "%Y-%m-%d"
CLEANED_FILE_PREFIX: str = "cleaned_"
REPORT_FILE_PREFIX: str = "report_"
