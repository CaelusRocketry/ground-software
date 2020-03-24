import json
from telemetry import Telemetry
from backend import Backend

from flask import Flask, render_template
from flask_cors import CORS
from flask_socketio import SocketIO, emit, Namespace
import threading
import time

config = json.loads(open("config.json").read())
GS_IP = config["GS_IP"]
GS_PORT = config["GS_PORT"]

app = Flask(__name__, static_folder="templates")
CORS(app)
socketio = SocketIO(app, cors_allowed_origins="*")

if __name__ == "__main__":
    telem = Telemetry(GS_IP, GS_PORT)
    telem.begin()

    print("listening and sending")

    b = Backend('/')
    b.init_telem(app, socketio)
    telem.init_backend(b)

    socketio.on_namespace(b)
    socketio.run(app, host='127.0.0.1', port=5000)

    # while True:
    #     temp = input("")
    #     header = temp[:temp.index(" ")]
    #     message = temp[temp.index(" ") + 1:]
    #     pack = Packet(header=header)
    #     log = Log(header=header, message=message)
    #     pack.add(log)
    #     enqueue(Packet(header="MESSAGE", logs=[log]))
