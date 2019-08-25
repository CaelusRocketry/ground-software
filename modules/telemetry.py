import socket, threading, time, json
import heapq
import Crypto
from Crypto.PublicKey import RSA
from Crypto import Random
import multiprocessing
from packet import Packet
from Crypto.Cipher import PKCS1_OAEP
import ast

GS_IP = '127.0.0.1'
GS_PORT = 5005
BYTE_SIZE = 8192

DELAY = .05
DELAY_LISTEN=.05
DELAY_SEND=.05
DELAY_HEARTBEAT=.5

SEND_ALLOWED=True

queue_send=[]

def create_socket():
    print("Creating socket")
    sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    sock.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
    sock.bind((GS_IP, GS_PORT))
    sock.listen(1)
    conn, addr = sock.accept()
    print("Created socket")
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
        ingest_thread.daemon = True
        ingest_thread.start()
        time.sleep(DELAY_LISTEN)

def enqueue(packet = Packet()):
    packet_string = packet.to_string()
    encoded = encode(packet_string)
    heapq.heappush(queue_send, (packet.level, encoded))

def ingest(encoded):
    packet_str = decode(encoded)
    packet = Packet.from_string(packet_str)
    print("Incoming: "+packet.message)

def encode(packet):
    with open("public.pem", "rb") as publickey:
        key = RSA.import_key(publickey.read())
    cipher = PKCS1_OAEP.new(key)
    return cipher.encrypt(str.encode(packet))

def decode(message):
    with open("private.pem", "rb") as privatekey:
        key = RSA.import_key(privatekey.read())
    cipher = PKCS1_OAEP.new(key)
    return cipher.decrypt(ast.literal_eval(str(message))).decode("utf-8")

def heartbeat():
    while True:
        enqueue(Packet(header="HEARTBEAT", message="AT"))
        time.sleep(DELAY_HEARTBEAT)

if __name__ == "__main__":
    sock = create_socket()
    send_thread = threading.Thread(target=send, args=(sock,))
    send_thread.daemon = True
    listen_thread = threading.Thread(target=listen, args=(sock,))
    listen_thread.daemon = True
    send_thread.start()
    listen_thread.start()
    print("Listening and sending")
    heartbeat_thread = threading.Thread(target=heartbeat)
    heartbeat_thread.daemon = True
    heartbeat_thread.start()
    while(True):
        temp = input("").split(" ")
        enqueue(Packet(header=temp[0], message=temp[1]))
