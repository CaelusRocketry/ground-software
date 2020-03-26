from flask import Flask, render_template
from flask_cors import CORS
from packet import Packet, Log, LogPriority
from flask_socketio import SocketIO, emit, Namespace


class Backend(Namespace):

    def init(self, app, socketio, telem):
        self.app = app
        self.socketio = socketio
        self.telem = telem
        print("Initialized")

    
    def update_heartbeat(self, message):
        #print(message)
        self.socketio.emit('heartbeat',  message)

    
    def update_sensor_data(self, message):
        #print(message)
        self.socketio.emit('update sensor data',  message)

    
    def update_valve_data(self, message):
        #print(message)
        self.socketio.emit('update valve data',  message)


    def on_button_press(self, message):
        print(message)
        log = Log(header="test", message={"response": message})
        self.telem.enqueue(Packet(logs=[log], level=LogPriority.INFO))
