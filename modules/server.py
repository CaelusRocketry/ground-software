from flask import Flask
app = Flask(__name__)

@app.route('/')
def root():
    return "HELLO"
    
def start():
    app.run(debug=True)
