import json
from telemetry import Telemetry
from backend import Backend

from flask import Flask
from flask_cors import CORS
from flask_socketio import SocketIO
import time
import logging

import argparse

log = logging.getLogger("werkzeug")
log.setLevel(logging.ERROR)

config = {}

parser = argparse.ArgumentParser(
    description="Run the Project Caelus Ground Station Server.",
    formatter_class=argparse.RawTextHelpFormatter,
)

parser.add_argument(
    "--config",
    help="The config file to use for the simulation (enter "
    + "local if you want to run the simulation on the default local config). \n"
    + "Default: config.json",
)

args = parser.parse_args()

if args.config == "local":
    config = json.loads(open("config.json").read())
    config["GS_IP"] = "127.0.0.1"
    config["SOCKETIO_HOST"] = "127.0.0.1"
elif args.config != None:
    try:
        config = json.loads(open(args.config).read())
    except:
        raise Exception("Error reading from config file '" + args.config + "'")
else:
    config = json.loads(open("config.json").read())

GS_IP = config["telemetry"]["GS_IP"]
GS_PORT = config["telemetry"]["GS_PORT"]

app = Flask(__name__, static_folder="templates")
CORS(app)
sio = SocketIO(app, cors_allowed_origins="*")

time.sleep(1)

if __name__ == "__main__":
    print("listening and sending")

    backend = Backend("/")

    telemetry = Telemetry(GS_IP, GS_PORT)
    print('telemetery has started')
    telemetry.begin()

    backend.init(app, sio, telemetry)
    telemetry.init_backend(backend)

    sio.on_namespace(backend)
    sio.run(
        app,
        host=config["telemetry"]["SOCKETIO_HOST"],
        port=int(config["telemetry"]["SOCKETIO_PORT"]),
    )
