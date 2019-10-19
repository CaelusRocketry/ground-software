import socket
import threading
import time
import json
import heapq
import multiprocessing
from logging import Packet, Log
from Crypto.Cipher import AES
import ast
import base64
from Crypto.Util.Padding import pad, unpad

GS_IP = '192.168.1.75'
GS_PORT = 5005
BYTE_SIZE = 8192

DELAY = .05
DELAY_LISTEN = .05
DELAY_SEND = .05
DELAY_HEARTBEAT = 3

SEND_ALLOWED = True

key = b'getmeoutgetmeout'
queue_send = []

BLOCK_SIZE = 32


def create_socket(ip, port):
    print("Creating socket")
    sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    sock.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
    sock.bind((ip, port))
    sock.listen(1)
    conn, addr = sock.accept()
    print("Created socket")
    return conn
#    return sock


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
    packet_string = packet.to_string()
    encoded = encode(packet_string)
    heapq.heappush(queue_send, (packet.level, encoded))


def ingest(encoded):
    packet_str = decode(encoded)
    packet = Packet.from_string(packet_str)
   # print("Incoming: "+ str(packet.message))
    with open("incoming.txt", "a+") as coming:
        for log in packet.logs:
            coming.write("Incoming: "+ str(log.message)+ "\n")

def encode(packet):
    cipher = AES.new(key, AES.MODE_ECB)
    return cipher.encrypt(pad(packet.encode(), BLOCK_SIZE))
#    return packet.encode()


def decode(message):
    cipher = AES.new(key, AES.MODE_ECB)
    return unpad(cipher.decrypt(message), BLOCK_SIZE).decode()
#    return message.decode()


def heartbeat():
    while True:
        log = Log(header="HEARTBEAT", message="At")
        enqueue(Packet(header="HEARTBEAT", logs=[log]))
        time.sleep(DELAY_HEARTBEAT)


if __name__ == "__main__":
    sock = create_socket(GS_IP, GS_PORT)
#    back_front = create_socket(FRONT_IP, FRONT_PORT)
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
    while True:
        temp = input("")
        header = temp[:temp.index(" ")]
        message = temp[temp.index(" ") + 1:]
        pack = Packet(header=header)
        log = Log(header=header, message=message)
        pack.add(log)
        enqueue(pack)
