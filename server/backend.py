from flask import Flask, render_template
from flask_cors import CORS
from flask_socketio import SocketIO, emit, Namespace


class Backend(Namespace):

    def init(self, app, socketio):
        self.app = app
        self.socketio = socketio

    def update_heartbeat(self, message):
        #print(message)
        self.socketio.emit('heartbeat',  message)

    def update_sensor_data(self, message):
        #print(message)
        self.socketio.emit('update sensor data',  message)

    def update_valve_data(self, message):
        #print(message)
        self.socketio.emit('update valve data',  message)
