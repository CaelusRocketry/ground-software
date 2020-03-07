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

    def update_text(self, message):
        print(message)
        # with self.app.test_request_context():
        self.socketio.emit('update text',  {'data':message})

    def on_connect(self):
        emit('after connect',  {'data':'Lets dance'})

    def on_slider_value_changed(self, message):
        # values[message['who']] = message['data']
        print('\nnew val:', message['data'], '\n')

    def on_button_pressed(self, message):
        log = Log(header="BUTTON PRESS", message=message)
        self.telem.enqueue(Packet(header="BUTTON PRESS", logs=[log]))
        print("button pressed!", message)
