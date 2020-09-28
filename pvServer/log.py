import os
import logging

# Logging facilities
#
initial_log_level = os.environ.get('pvServerLogLevel', 'INFO')
if not hasattr(logging, initial_log_level.upper()):
    print('Log level {} not found. Use ERROR, WARNING, INFO, or DEBUG.'.format(initial_log_level))
    exit()
log_file = os.environ.get('pvServerLogFile', None)

logging.basicConfig(format='%(asctime)s %(levelname)-7s %(message)s', filename=log_file)

logging.getLogger('werkzeug').setLevel(logging.ERROR)

logger = logging.getLogger('pvServer')
logger.setLevel(getattr(logging, initial_log_level.upper()))

# Logging optimization
# Prevent formatting a message if logging is not enabled at given level.
# Use command an environmental variable pvServerLogLevel to set the logging level.
#
def _log(func, msg, args, kwargs):
    if isinstance(msg, str):
        func(msg.format(*args), **kwargs)
    else:
        func(str(msg), *args, **kwargs)

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
