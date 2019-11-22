from flask import Flask, render_template
from flask_socketio import SocketIO, emit

# Initialize Flask
# Use a custom static/template folder location, Vue builds to here
app = Flask(__name__,
            static_folder="./dist/static",
            template_folder="./dist")
socketio = SocketIO(app, cors_allowed_origins="http://localhost:5005")


@socketio.on('test')
def handle_test(data):
    print("server: recv 'test'")


@app.route("/")
def handle_root():
    """
    Render the built Vue site.
    """
    return render_template("index.html")


if __name__ == '__main__':
    socketio.run(app, debug=True)
