import unittest
import logging
import os
import sys

_this_dir = os.path.abspath(os.path.dirname(__file__))
sys.path.insert(0, os.path.join(_this_dir, '..'))
sys.path.insert(0, os.path.join(_this_dir, '..', 'userAuthentication'))

# Avoid any logging besides console
#
def del_environ(name):
    if name in os.environ:
        del os.environ[name]
del_environ('pvServerLogLevel')
del_environ('pvServerLogFile')
del_environ('pvServerLogFileBackup')
import log

os.environ['REACT_APP_EnableLogin'] = 'false'

class PvServerTestCase(unittest.TestCase):
    def setUp(self):
        log.logger.setLevel(logging.DEBUG)
