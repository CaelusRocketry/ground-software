from flask_socketio import SocketIO, emit, Namespace
from modules.log import Log

class Comms(Namespace):
    def on_connect(self):
        emit('after connect',  {'data':'Lets dance'})

    def on_slider_value_changed(self, message):
#        values[message['who']] = message['data']
        Log('\nnew val:', message['data'], '\n')

    def on_button_pressed(self, message):
        log = Log(header="BUTTON PRESS", message=message)
#        telem.enqueue(Packet(header="BUTTON PRESS", logs=[log]))
        print("button pressed!", message)
