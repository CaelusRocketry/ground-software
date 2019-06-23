import socket
import threading

IP = "192.168.1.84" # Needed for local development
PORT = 8081

def start():
    sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    sock.bind((IP, PORT))
    sock.listen(1)
    conn, addr = sock.accept()
    listen_thread = threading.Thread(target=listen, args=(conn,))
    listen_thread.start()
    
def listen(conn):
    while True:
        data = conn.recv(1024)
        data = data.decode()
        print(data)

if __name__ == "__main__":
    start()