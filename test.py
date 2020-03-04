import socket
import threading
import time
import json
import heapq
import multiprocessing
from packet import Packet, Log
import ast
import base64

from flask import Flask, render_template
from flask_cors import CORS
from flask_socketio import SocketIO, emit, Namespace
import threading, time

app = Flask(__name__, static_folder="templates")
CORS(app)
socketio = SocketIO(app)

values = {
    'slider1': 25,
    'slider2': 0,
}

config = json.loads(open("config.json").read())
GS_IP = config["GS_IP"]
GS_PORT = config["GS_PORT"]
BYTE_SIZE = 8192

DELAY = .05
DELAY_LISTEN = .05
DELAY_SEND = .05
DELAY_HEARTBEAT = 3

SEND_ALLOWED = True

BLOCK_SIZE = 32
f = open("black_box.txt", "w+")
f.close()

global telem

class Telemetry:
    """ Telemetry Class handles all communication """


    def __init__(self, ip, port):
        """ Based on given IP and port, create and connect a socket """
        self.queue_send = []
        self.sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        self.sock.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
        self.sock.bind((ip, port))
        self.sock.listen(1)
        self.conn, self.addr = self.sock.accept()
        Log("Created socket")
    
    def begin(self):
        """ Starts the send and listen threads """
        self.send_thread = threading.Thread(target=self.send)
        self.send_thread.daemon = True
        self.listen_thread = threading.Thread(target=self.listen)
        self.listen_thread.daemon = True
        self.heartbeat_thread = threading.Thread(target=self.heartbeat)
        self.heartbeat_thread.daemon = True
        self.send_thread.start()
        self.listen_thread.start()
        self.heartbeat_thread.start()


    def send(self):
        """ Constantly sends next packet from queue to ground station """
        while True:
            if self.queue_send and SEND_ALLOWED:
                encoded = heapq.heappop(self.queue_send)[1]
                self.conn.send(encoded)
            time.sleep(DELAY_SEND)

    def listen(self):
        """ Constantly listens for any from ground station """
        while True:
            data = self.conn.recv(BYTE_SIZE)
            self.ingest_thread = threading.Thread(target=self.ingest, args=(data,))
            self.ingest_thread.daemon = True
            self.ingest_thread.start()
            time.sleep(DELAY_LISTEN)

    def enqueue(self, packet):
        """ Encripts and enqueues the given Packet """
        packet_str = packet.to_string().encode()
        heapq.heappush(self.queue_send, (packet.level, packet_str))

    def ingest(self, packet_str):
        """ Prints any packets received """
        packet = Packet.from_string(packet_str)
        for log in packet.logs:
            print(log.to_string())
            log.save()

    def heartbeat(self):
        """ Constantly sends heartbeat message """
        while True:
            log = Log(header="HEARTBEAT", message="AT")
            self.enqueue(Packet(header="HEARTBEAT", logs=[log]))
            print("Sent heartbeat")
            time.sleep(DELAY_HEARTBEAT)


@app.route('/')
def index():
    return render_template('index.html',**values)

class Comms(Namespace):
    def on_connect(self):
        emit('after connect',  {'data':'Lets dance'})

    def on_slider_value_changed(self, message):
        values[message['who']] = message['data']
        print('\nnew val:', message['data'], '\n')

    def on_button_pressed(self, message):
        global telem
        log = Log(header="BUTTON PRESS", message=message)
        telem.enqueue(Packet(header="BUTTON PRESS", logs=[log]))
        print("button pressed!", message)


socketio.on_namespace(Comms('/'))
     
if __name__ == "__main__":
    global telem
    telem = Telemetry(GS_IP, GS_PORT)
    telem.begin()

    Log("Listening and Sending")
    print("listening and sending")

    socketio.run(app, host='127.0. 0.1.', port=3000)


    # while True:
    #     temp = input("")
    #     header = temp[:temp.index(" ")]
    #     message = temp[temp.index(" ") + 1:]
    #     pack = Packet(header=header)
    #     log = Log(header=header, message=message)
    #     pack.add(log)
    #     enqueue(Packet(header="MESSAGE", logs=[log]))