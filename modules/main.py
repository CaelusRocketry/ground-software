from flask import Flask, render_template
from flask_socketio import SocketIO, emit
from log import Log, Packet, Level
#import socket

# Initialize Flask
# Use a custom static/template folder location, Vue builds to here
app = Flask(__name__,
            static_folder="./dist/static",
            template_folder="./dist")
socketio = SocketIO(app, cors_allowed_origins="http://localhost:5005")

@socketio.on('test')
def handle_test(data):
    print("server: recv 'test'", data)

@socketio.on("actuate_valve")
def actuate_valve(id: int, degree: int, priority: int):
    header = "Valve"
    message = "actuate_valve int:" + str(id) + " int:" + str(degree) + " int:" + str(priority)
    print(header, message)
    forward_message(header, message, level=1)

@socketio.on("forward")
def forward_message(header, message, level=Level.INFO):
    log = Log(header=header, message=message, level=level)
    


@app.route("/")
def handle_root():
    """
    Render the built Vue site.
    """
    return render_template("index.html")



if __name__ == '__main__':
    socketio.run(app, debug=False)
