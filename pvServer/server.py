from flask import Flask
from flask_cors import CORS
from flask_socketio import SocketIO
from werkzeug.routing import BaseConverter

# Set this variable to "threading", "eventlet" or "gevent" to test the
# different async modes, or leave it set to None for the application to choose
# the best option based on installed packages.
async_mode = "gevent"


class RegexConverter(BaseConverter):
    def __init__(self, url_map, *items):
        super(RegexConverter, self).__init__(url_map)
        self.regex = items[0]


app = Flask(__name__, static_folder="./build/static", template_folder="./build")
app.url_map.converters["regex"] = RegexConverter
CORS(app)

socketio = SocketIO(app, async_mode=async_mode, cors_allowed_origins="*")
