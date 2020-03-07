import socket
import threading
import time
import json
import heapq
from . import logging, encryption
from .log import Packet, Log
from collections import deque

BYTE_SIZE = 8192

DELAY = .05
DELAY_LISTEN = .05
DELAY_SEND = .25

SEND_ALLOWED = True


class Telemetry:
    """ Telemetry Class handles all communication """


    def __init__(self, IP, PORT):
        """ Based on given IP and port, create and connect a socket """
        self.queue_send = []
        self.queue_ingest = deque([])
        self.sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        self.sock.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
        self.sock.bind((IP, PORT))
        self.sock.listen(1)
        conn, addr = self.sock.accept()
        self.conn = conn
        print("Connected socket")


    def begin(self):
        """ Starts the send and listen threads """
        send_thread = threading.Thread(target=self.send)
        listen_thread = threading.Thread(target=self.listen)
        listen_thread.daemon = True
        send_thread.daemon = True
        send_thread.start()
        listen_thread.start()
        # self.enqueue(Packet(message=input("")))  # Used for testing purposes


    def end(self):
        """ Kills socket connection """
        # TODO: Test if a "connection" can be separately shutdown
        self.conn.shutdown()
        self.conn.close()
        self.sock.shutdown()
        self.sock.close()


    def send(self):
        """ Constantly sends next packet from queue to flight """
        while True:
            if self.queue_send and SEND_ALLOWED:
                encoded = heapq.heappop(self.queue_send)[1]
                self.conn.send(encoded)
            time.sleep(DELAY_SEND)


    def listen(self):
        """ Constantly listens for any from flight """
        while True:
            data = self.conn.recv(BYTE_SIZE)
            self.queue_ingest.append(data)
            time.sleep(DELAY_LISTEN)


    def enqueue(self, packet):
        """ Encripts and enqueues the given Packet """
        packet_string = packet.to_string()  # Converts packet to string form
        print("Enqueueing", packet_string)
        encoded = encryption.encrypt(packet_string)
        heapq.heappush(self.queue_send, (packet.level, encoded))
