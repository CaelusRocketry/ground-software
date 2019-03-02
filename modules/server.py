import time
from threading import Thread

import yaml
import flask

from main import load_config
config = load_config()

app = flask.Flask(__name__)

temp = 0
 
@app.route("/")
def path_home() -> None:
    return flask.render_template('index.html', temp=temp)
 
def start():
    serverThread = Thread(target=lambda: app.run(port=config["modules"]["server"]["port"]))
    serverThread.start()
    