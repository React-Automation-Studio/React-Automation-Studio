import os
from dotenv import load_dotenv


_initialized = False

EPICS_LIBCA = None
EPICS_BASE = None
EPICS_CA_ADDR_LIST = None
PV_SERVER_URL = None
PV_SERVER_PORT = 5000
PV_SERVER_NAME_SPACE = "pvServer"

PV_SERVER_LOG_LEVEL = "INFO"
PV_SERVER_LOG_FILE = None
PV_SERVER_LOG_FILE_SIZE = 0
PV_SERVER_LOG_FILE_BACKUP = 0

REACT_APP_DisableLogin = None
REACT_APP_EnableActiveDirectoryLogin = None
REACT_APP_EnableGoogleLogin = None
REACT_APP_DisableStandardLogin = None

REFRESH_COOKIE_MAX_AGE_SECS = None
ACCESS_TOKEN_MAX_AGE_SECS = None
REFRESH_TIMEOUT = None
SECURE = None

SECRET_PWD_KEY = None
DEFAULT_PWD_KEY = "ugZnU^E3Fr4gapj^?zH%V5&H}A]*{mC]#>/nY_?ceSt$?99PL[md+29]:$dn)3#X"


def optional_int(value, default):
    if value is None:
        return default
    try:
        return int(value)
    except ValueError:
        return default


def init():
    """Initialize configuration unless it has been initialized already.
    Configuration uses environmental variables and the .env file.
    """
    global _initialized
    if _initialized:
        return

    load_dotenv()

    global EPICS_LIBCA
    EPICS_LIBCA = os.getenv("PYEPICS_LIBCA", None)
    global EPICS_BASE
    EPICS_BASE = os.getenv("EPICS_BASE", None)
    global EPICS_CA_ADDR_LIST
    EPICS_CA_ADDR_LIST = os.getenv("EPICS_CA_ADDR_LIST", None)

    global PV_SERVER_URL
    PV_SERVER_URL = os.getenv("pvServerURL", None)
    global PV_SERVER_PORT
    PV_SERVER_PORT = optional_int(os.getenv("pvServerPort"), PV_SERVER_PORT)


    global PV_SERVER_LOG_LEVEL
    PV_SERVER_LOG_LEVEL = os.getenv("pvServerLogLevel", PV_SERVER_LOG_LEVEL)
    global PV_SERVER_LOG_FILE
    PV_SERVER_LOG_FILE = os.getenv("pvServerLogFile", None)
    global PV_SERVER_LOG_FILE_SIZE
    PV_SERVER_LOG_FILE_SIZE = os.getenv("pvServerLogFileSize", None)
    global PV_SERVER_LOG_FILE_BACKUP
    PV_SERVER_LOG_FILE_BACKUP = os.getenv("pvServerLogFileBackup", None)

    global REACT_APP_DisableLogin
    REACT_APP_DisableLogin = os.getenv("REACT_APP_EnableLogin", None) != "true"
    global REACT_APP_EnableActiveDirectoryLogin
    REACT_APP_EnableActiveDirectoryLogin = (
        os.getenv("REACT_ENABLE_LOGIN_AD", None) == "true"
    )
    global REACT_APP_EnableGoogleLogin
    REACT_APP_EnableGoogleLogin = os.getenv("REACT_ENABLE_LOGIN_GOOGLE", None) == "true"
    global REACT_APP_DisableStandardLogin
    REACT_APP_DisableStandardLogin = (
        os.getenv("REACT_APP_DisableStandardLogin", None) == "true"
    )

    global REFRESH_COOKIE_MAX_AGE_SECS
    REFRESH_COOKIE_MAX_AGE_SECS = optional_int(
        os.getenv("REFRESH_COOKIE_MAX_AGE_SECS"), 604800
    )
    global ACCESS_TOKEN_MAX_AGE_SECS
    ACCESS_TOKEN_MAX_AGE_SECS = optional_int(
        os.getenv("ACCESS_TOKEN_MAX_AGE_SECS"), 300
    )
    global REFRESH_TIMEOUT
    REFRESH_TIMEOUT = optional_int(os.getenv("REFRESH_TIMEOUT"), 60)
    global SECURE
    SECURE = os.getenv("SECURE") == "true"

    global SECRET_PWD_KEY
    SECRET_PWD_KEY = os.getenv("SECRET_PWD_KEY", DEFAULT_PWD_KEY)

    _initialized = True


def print(log):
    """Print configuration to the log.
    """
    def yesno(x):
        return "YES" if x else "no"

    log.info("pvServer Configuration and Enviromental Variables:")

    log.info(f"PYEPICS_LIBCA: {EPICS_LIBCA}")
    log.info(f"EPICS_BASE: {EPICS_BASE}")
    log.info(f"EPICS_CA_ADDR_LIST: {EPICS_CA_ADDR_LIST}")

    log.info(f"pvServerURL: {PV_SERVER_URL}")
    log.info(f"pvServerPort: {PV_SERVER_PORT}")

    log.info(f"pvServerLogLevel: {PV_SERVER_LOG_LEVEL}")
    log.info(f"pvServerLogFile: {PV_SERVER_LOG_FILE}")
    log.info(f"pvServerLogFileSize: {PV_SERVER_LOG_FILE_SIZE}")
    log.info(f"pvServerLogFileBackup: {PV_SERVER_LOG_FILE_BACKUP}")

    log.info(f"REFRESH_COOKIE_MAX_AGE_SECS: {REFRESH_COOKIE_MAX_AGE_SECS}")
    log.info(f"ACCESS_TOKEN_MAX_AGE_SECS: {ACCESS_TOKEN_MAX_AGE_SECS}")
    log.info(f"REFRESH_TIMEOUT: {REFRESH_TIMEOUT}")
    log.info(f"SECURE: {yesno(REFRESH_TIMEOUT)}")

    if REACT_APP_DisableLogin:
        log.info("Authentication and Authorization is DISABLED")
    else:
        log.info("Authentication and Authorization is ENABLED")
    log.info(
        f"REACT_APP_EnableActiveDirectoryLogin: {yesno(REACT_APP_EnableActiveDirectoryLogin)}"
    )
    log.info(f"REACT_APP_EnableGoogleLogin: {yesno(REACT_APP_EnableGoogleLogin)}")
    log.info(f"REACT_APP_DisableStandardLogin: {yesno(REACT_APP_DisableStandardLogin)}")

    if not SECRET_PWD_KEY:
        log.error(
            f"SECRET_PWD_KEY: Not set. Please, set SECRET_PWD_KEY in the .env file"
        )
    elif SECRET_PWD_KEY == DEFAULT_PWD_KEY:
        log.warning(
            f"SECRET_PWD_KEY: Default in use. Please, set SECRET_PWD_KEY in the .env file"
        )
    else:
        log.info(f"SECRET_PWD_KEY: ****")
