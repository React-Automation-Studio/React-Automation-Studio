#!/usr/bin/env python
from gevent import monkey

monkey.patch_all()

import sys

sys.path.insert(0, "../")
sys.path.insert(0, "userAuthentication/")

import config
import log

app = None
socketio = None


def init():
    """Initialize and configure pvServer prior introducing any endpoints."""
    config.init()
    log.init()

    log.info("**************************************")
    log.info("React Automation Studio V3.1.0")
    log.info("")
    config.print(log)

    import server

    global app
    app = server.app
    global socketio
    socketio = server.socketio


def start():
    """Start the pvServer using the current configuration."""
    REACT_APP_PyEpicsServerURL = config.PV_SERVER_URL
    pvServerPort = config.PV_SERVER_PORT
    REACT_APP_PyEpicsServerURL = (
        REACT_APP_PyEpicsServerURL + ":" + pvServerPort + "/" + "pvServer"
    )
    log.info("Starting pvServer")
    log.info("pvServer URL: ", REACT_APP_PyEpicsServerURL)
    log.info("")
    if REACT_APP_PyEpicsServerURL is not None:
        if REACT_APP_PyEpicsServerURL.startswith("https"):
            socketio.run(
                app,
                host="0.0.0.0",
                debug=True,
                port=pvServerPort,
                keyfile="../certificates/server.key",
                certfile="../certificates/server.cer",
                use_reloader=False,
            )
        else:
            socketio.run(
                app,
                host="0.0.0.0",
                port=pvServerPort,
                debug=True,
                use_reloader=False,
            )
    else:
        socketio.run(app, host="127.0.0.1", debug=True, use_reloader=False)


if __name__ == "__main__":
    # Startup sequence:
    # 1) Initialize and configure
    # 2) Define endpoints.
    # 3) Start the pvServer.
    init()
    import core

    start()
