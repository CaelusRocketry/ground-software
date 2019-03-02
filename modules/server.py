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

def update_field(field: int) -> None:
    global temp
    temp = field
    print(temp)
 
def start():
    Thread(target=lambda: app.run(port=config["modules"]["server"]["port"])).start()
    time.sleep(10)
    update_field(10)