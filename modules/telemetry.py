import socket, threading, time, json
import heapq
import Crypto
from Crypto.PublicKey import RSA
from Crypto import Random
import multiprocessing
from packet import Packet

GS_IP = '127.0.0.1'
GS_PORT = 5005
BYTE_SIZE = 1024

DELAY = .05

def create_socket():
    sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    sock.bind((GS_IP, GS_PORT))
    sock.listen(1)
    conn, addr = sock.accept()
    return conn

def send(sock):
    while True:
        if queue_send and SEND_ALLOWED:
            encoded = heapq.heappop(queue_send)[1]
            sock.send(encoded)
        time.sleep(DELAY_SEND)

def listen(sock):
    while True:
        data = sock.recv(BYTE_SIZE)
        ingest_thread = threading.Thread(target=ingest, args=(data,))
        ingest_thread.start()
        time.sleep(DELAY_LISTEN)

def enqueue(packet = Packet()):
    packet_string = packet.to_str()
    encoded = encode(packet_string)
    heapq.heappush(queue_send, (packet.level, encoded))

def ingest(encoded):
    packet_str = decode(encoded)
    packet = Packet.from_str(packet_str)
    print(packet)

def encode(packet):
	with open("publickey.txt", "rb") as publickey:
		return RSA.importKey(publickey.read()).encrypt(packet)

def decode(message):
	with open("privatekey.txt", "rb") as privatekey:
		return RSA.importKey(privatekey.read()).decrypt(message)
	
if __name__ == "__main__":
    sock = create_socket()
    send_thread = threading.Thread(target=send, args=(sock,))
    listen_thread = threading.Thread(target=listen, args=(sock,))
    send_thread.start()
    listen_thread.start()
    print("Listening and sending")

