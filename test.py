import socket
import threading
import time
import json
import heapq
import multiprocessing
from logging import Packet, Log
import ast
import base64

config = json.loads(open("config.json").read())
GS_IP = config["GS_IP"]
GS_PORT = config["GS_PORT"]
BYTE_SIZE = 8192

DELAY = .05
DELAY_LISTEN = .05
DELAY_SEND = .05
DELAY_HEARTBEAT = 3

SEND_ALLOWED = True

queue_send = []

BLOCK_SIZE = 32
f = open("black_box.txt", "w+")
f.close()

def create_socket(ip, port):
    Log("Creating socket")
    sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    sock.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
    sock.bind((ip, port))
    sock.listen(1)
    conn, addr = sock.accept()
    Log("Created socket")
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

def enqueue(packet):
    packet_str = packet.to_string().encode()
    heapq.heappush(queue_send, (packet.level, packet_str))

def ingest(packet_str):
    packet = Packet.from_string(packet_str)
    for log in packet.logs:
        print(log.to_string())
        log.save()

def heartbeat():
    while True:
        log = Log(header="HEARTBEAT", message="AT")
        enqueue(Packet(header="HEARTBEAT", logs=[log]))
        print("Sent heartbeat")
        time.sleep(DELAY_HEARTBEAT)

if __name__ == "__main__":
    sock = create_socket(GS_IP, GS_PORT)
    send_thread = threading.Thread(target=send, args=(sock,))
    send_thread.daemon = True
    listen_thread = threading.Thread(target=listen, args=(sock,))
    listen_thread.daemon = True
    heartbeat_thread = threading.Thread(target=heartbeat)
    heartbeat_thread.daemon = True
    send_thread.start()
    listen_thread.start()
    heartbeat_thread.start()
    Log("Listening and sending")
    while True:
        temp = input("")
        header = temp[:temp.index(" ")]
        message = temp[temp.index(" ") + 1:]
        pack = Packet(header=header)
        log = Log(header=header, message=message)
        pack.add(log)