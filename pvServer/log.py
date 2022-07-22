import logging
import os
import queue
from logging.handlers import QueueHandler, QueueListener, RotatingFileHandler
import config


logger = None


def _convert_to_int(value, min_value, default_value):
    if value is None:
        return default_value
    try:
        return max(min_value, int(value))
    except ValueError:
        return default_value


def init():
    """Initialize and configure logger.
    """
    global logger
    if logger is not None:
        return
    
    config.init()
    initial_log_level = config.PV_SERVER_LOG_LEVEL
    if not hasattr(logging, initial_log_level.upper()):
        print(
            "Log level {} not found. Use ERROR, WARNING, INFO, or DEBUG.".format(
                initial_log_level
            )
        )
        exit()

    log_file = config.PV_SERVER_LOG_FILE
    if log_file is not None:
        log_file = os.path.abspath(log_file)

    log_file_max_size = _convert_to_int(
        config.PV_SERVER_LOG_FILE_SIZE, 1024, 16 * 1024 * 1024  # 16 MB
    )
    config.PV_SERVER_LOG_FILE_SIZE = log_file_max_size

    log_file_backup = _convert_to_int(config.PV_SERVER_LOG_FILE_BACKUP, 0, 2)

    # Use queues to avoid delays in the main thread.
    log_queue = queue.Queue(512)
    queue_handler = QueueHandler(log_queue)
    if log_file is None:
        log_handler = logging.StreamHandler()
    else:
        log_handler = RotatingFileHandler(
            log_file, maxBytes=log_file_max_size, backupCount=log_file_backup
        )
    queue_listener = QueueListener(log_queue, log_handler)
    log_handler.setFormatter(
        logging.Formatter("%(asctime)s %(levelname)-7s %(message)s")
    )

    queue_listener.start()

    # Let us collect logs from all loggers.
    logging.getLogger("").addHandler(log_handler)

    logging.getLogger("werkzeug").setLevel(logging.ERROR)

    logger = logging.getLogger("pvServer")
    logger.setLevel(getattr(logging, initial_log_level.upper()))

    print("pvServer Logging:")
    print("")
    print(f"Log level: {config.PV_SERVER_LOG_LEVEL}")
    if config.PV_SERVER_LOG_FILE is not None:
        print(f"Log output: {config.PV_SERVER_LOG_FILE}")
        print(f"Log max size: {config.PV_SERVER_LOG_FILE_SIZE} bytes")
        print(f"Log file backup: {config.PV_SERVER_LOG_FILE_BACKUP}")
    else:
        print(f"Log output: stdout")
    print("")


# Logging optimization
# Prevent formatting a message if logging is not enabled at given level.
# Use command an environmental variable pvServerLogLevel to set the logging level.
def _log(func, msg, args, kwargs):
    try:
        if isinstance(msg, str):
            func(msg.format(*args), **kwargs)
        else:
            func(str(msg), *args, **kwargs)
    except queue.Full:
        print(f"Log queue full. Ignoring log [{ msg }].")


def debug(msg, *args, **kwagrs):
    if logger.isEnabledFor(logging.DEBUG):
        _log(logger.debug, msg, args, kwagrs)


def info(msg, *args, **kwagrs):
    if logger.isEnabledFor(logging.INFO):
        _log(logger.info, msg, args, kwagrs)


def warning(msg, *args, **kwagrs):
    if logger.isEnabledFor(logging.WARNING):
        _log(logger.warning, msg, args, kwagrs)


def error(msg, *args, **kwagrs):
    if logger.isEnabledFor(logging.ERROR):
        _log(logger.error, msg, args, kwagrs)


def exception(msg, *args, **kwargs):
    if logger.isEnabledFor(logging.CRITICAL):
        _log(logger.exception, msg, args, kwargs)
