from flask import Flask, render_template
from flask_cors import CORS
from flask_socketio import SocketIO, emit, Namespace
import threading, time
from packet import Packet, Log


class Backend(Namespace):

    def init_telem(self, app, socketio, telem):
        self.app = app
        self.telem = telem
        self.socketio = socketio

    def update_heartbeat(self, message):
        print(message)
        self.socketio.emit('heartbeat',  {'data': message})

    def update_sensor_data(self, message):
        print(message)
        self.socketio.emit('update sensor data',  {'data': message})

    def update_value_data(self, message):
        print(message)
        self.socketio.emit('update valve data',  {'data': message})



        





