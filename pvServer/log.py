import os
import queue
import logging
import logging.handlers

def _convert_to_int(value, min_value, default_value):
    if value is None:
        return default_value
    try:
        return max(min_value, int(value))
    except ValueError:
        return default_value

# Logging facilities
#
# Use queues to avoid delays in the main thread.
#
initial_log_level = os.environ.get('pvServerLogLevel', 'INFO')
if not hasattr(logging, initial_log_level.upper()):
    print('Log level {} not found. Use ERROR, WARNING, INFO, or DEBUG.'.format(initial_log_level))
    exit()
log_file = os.environ.get('pvServerLogFile', None)
if log_file is not None:
    log_file = os.path.abspath(log_file)
log_file_max_size = _convert_to_int(os.environ.get('pvServerLogFileSize', None), 1024, 16 * 1024 * 1024) # 16 MB
log_file_backup = _convert_to_int(os.environ.get('pvServerLogFileBackup', None), 0, 2)

print('pvServer Logging:')
print('')
print(f'Log level: { initial_log_level }')
if log_file is not None:
    print(f'Log output: { log_file }')
    print(f'Log max size: { log_file_max_size } bytes')
    print(f'Log file backup: { log_file_backup }')
else:
    print(f'Log output: stdout')
print('')

log_queue = queue.Queue(512)
queue_handler = logging.handlers.QueueHandler(log_queue)
if log_file is None:
    log_handler = logging.StreamHandler()
else:
    log_handler = logging.handlers.RotatingFileHandler(log_file, maxBytes=log_file_max_size, backupCount=log_file_backup)
queue_listener = logging.handlers.QueueListener(log_queue, log_handler)
log_handler.setFormatter(logging.Formatter('%(asctime)s %(levelname)-7s %(message)s'))

queue_listener.start()

# Let us collect logs from all loggers.
logging.getLogger('').addHandler(log_handler)

logging.getLogger('werkzeug').setLevel(logging.ERROR)

logger = logging.getLogger('pvServer')
logger.setLevel(getattr(logging, initial_log_level.upper()))


# Logging optimization
# Prevent formatting a message if logging is not enabled at given level.
# Use command an environmental variable pvServerLogLevel to set the logging level.
#
def _log(func, msg, args, kwargs):
    try:
        if isinstance(msg, str):
            func(msg.format(*args), **kwargs)
        else:
            func(str(msg), *args, **kwargs)
    except queue.Full:
        print(f'Log queue full. Ignoring log [{ msg }].')

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
