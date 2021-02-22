import socketio
import eventlet

socket = socketio.Server(async_mode='eventlet')
app = socketio.WSGIApp(socket)

@socket.on('echo')
def echo(sid, message):
    socket.emit('echo', message)

def worker1():
    eventlet.wsgi.server(eventlet.listen(('127.0.0.1', 5000)), app)

def worker2():
    while(1):
        print("send interval")
        socket.emit('send_data', {'data': 'hi!'})
        socket.sleep(1)

def main():
    socket.start_background_task(worker2)
    worker1()

if __name__ == '__main__':
    main()