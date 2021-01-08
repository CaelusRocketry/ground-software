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

    
    def update_general(self, log):
        print("General:", log)
        self.socketio.emit('general',  log)
    
    
    def update_sensor_data(self, log):
        print("Sensor:", log)
        self.socketio.emit('sensor_data',  log)

    
    def update_valve_data(self, log):
        print("Valve:", log)
        self.socketio.emit('valve_data',  log)


    def on_button_press(self, data):
        print(data)
        log = Log(header=data['header'], message=data['message'])
        self.telem.enqueue(Packet(logs=[log], priority=LogPriority.INFO))