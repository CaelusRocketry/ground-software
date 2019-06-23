import time
from threading import Thread
import socket
import yaml
from collections import deque
import json

from main import load_config

config = load_config()
sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
QUEUE = deque([])
PASSWORD = 'abc'

def ingest(data_dict):
    if 'header' not in data_dict or 'message' not in data_dict or 'timestamp' not in data_dict:
        print('Bad message format')
        return
    header = data_dict['header']
    message = data_dict['message']
    timestamp = data_dict['timestamp']
    if header != PASSWORD:
        print('Unknown source')
        return
    print(message)
    return

def listen():
    BUFFER = config["modules"]["server"]["buffer"]
    while True:
        data = sock.recv(BUFFER)
        data = data.decode()
        data_dict = json.loads(data)
        ingest_thread = Thread(target=ingest, args=(data_dict,))
        ingest_thread.start()

def send():
    send_delay = config["modules"]["server"]["send_delay"]
    while True:
        if len(QUEUE) > 0:
            pack = QUEUE.popleft()
            pack_str = json.dumps(pack)
            pack_bytes = pack_str.encode()
            sock.send(pack)
            time.sleep(send_delay)

def enqueue(header, message):
    pack = {}
    pack['header'] = header
    pack['message'] = message
    pack['timestamp'] = time.time()
    QUEUE.append(pack)

def start():
    IP = config["modules"]["server"]["ip"]
    port = config["modules"]["server"]["port"]
    sock.bind((IP, port))
    listen_thread = 
    