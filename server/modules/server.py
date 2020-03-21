from flask_cors import CORS
from flask import Flask, Response, render_template
from flask_socketio import SocketIO, emit, Namespace
import flask

from modules.comms import Comms


class EndpointAction(object):
    def __init__(self, action):
        self.action = action

    def __call__(self, *args):
        # Perform the action
        answer = self.action()
        # Create the answer (bundle it in a correctly formatted HTTP answer)
        self.response = flask.Response(answer, status=200, headers={})
        # Send it
        return self.response


class Server:

    def __init__(self, name):
        self.app = Flask(name)
        CORS(self.app)
        self.socketio = SocketIO(self.app)
        self.values = {
            'slider1': 25,
            'slider2': 0,
        }
        self.socketio.on_namespace(Comms('/'))
        self.add_endpoint(endpoint="/", endpoint_name="/", handler=self.index)
        self.add_endpoint(endpoint="/test",
                          endpoint_name="/test", handler=self.test)

    def index(self):
        return render_template('index.html')

    def test(self):
        return "test"

    def add_endpoint(self, endpoint=None, endpoint_name=None, handler=None):
        self.app.add_url_rule(endpoint, endpoint_name, EndpointAction(handler))

    def run(self):
        #        self.app.run(host='127.0.0.1', port=5000, debug=True)
        self.socketio.run(self.app, host='127.0.0.1', port=5000)
