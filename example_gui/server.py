from flask import Flask
from flask import render_template

app = Flask(__name__)

@app.route('/')
def hello_world():
    return 'Hello, World!'

@app.route('/post/<float:temp>/<float:pressure>')
def send_data(temp, pressure):
    with open("data.csv", "a") as f:
        f.write(f"{temp},{pressure}\n")
    return render_template('main.html.j2', temp=temp, pressure=pressure)
