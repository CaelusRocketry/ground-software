import time
import heapq
import socket
import threading
from typing import Any, List, Tuple
from packet import Packet, Log, LogPriority
from flask_socketio import SocketIO, emit, Namespace


BYTE_SIZE = 8192

DELAY = .05
DELAY_LISTEN = .05
DELAY_SEND = .05
DELAY_HEARTBEAT = 3

SEND_ALLOWED = True

BLOCK_SIZE = 32
f = open("black_box.txt", "w+")
f.close()


class Handler(Namespace):
    """ Handles all communication """

    def init(self, ip, port, socketio):
        """ Based on given IP and port, create and connect a socket """

        """ A heapqueue of packets to send """
        self.queue_send = []
        self.connect(ip, port)
        self.start_time = time.time()
        self.accepted_sockets: List[Tuple[socket.socket, Any]] = []

        self.socketio = socketio
        self.socketio.on_event(
            'json',
            self.send_to_flight_software
        )
        

    def connect(self, ip, port):
        # Server-side socket
        self.sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        self.sock.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)

        # Binds to the provided IP and port
        print("IP:", ip, "PORT:", port)
        self.sock.bind((ip, port))

        # Listens for connections, allowing at most 1 pending connection
        self.sock.listen(1)

        # Accept a connection
        self.accepted_sockets.append(self.sock.accept())
        
        print("Finished connecting")


    def begin(self):
        """ Starts the send and listen threads """
        self.send_thread = threading.Thread(target=self.send, daemon=True)
        self.listen_thread = threading.Thread(target=self.listen, daemon=True)
        self.heartbeat_thread = threading.Thread(target=self.heartbeat, daemon=True)
        self.send_thread.start()
        self.listen_thread.start()
        self.heartbeat_thread.start()


    def send_to_flight_software(self, json):
        self.enqueue(
            Packet(logs=[Log(
                header=json['header'],
                message=json['message'],
                timestamp=time.time())
            ])
        )


    def send(self):
        """ Constantly sends next packet from queue to ground station """
        while True:
            if self.queue_send and SEND_ALLOWED:
                encoded = heapq.heappop(self.queue_send)[1]
                self.conn.send(encoded)
            time.sleep(DELAY_SEND)


    def listen(self):
        """ Constantly listens for any from ground station """
        while True:
            data = self.conn.recv(BYTE_SIZE)
            if data:
                self.ingest_thread = threading.Thread(
                    target=self.ingest, args=(data,))
                self.ingest_thread.daemon = True
                self.ingest_thread.start()
                # time.sleep(DELAY_LISTEN)


    def enqueue(self, packet):
        """ Encrypts and enqueues the given Packet """
        # TODO: This is implemented wrong. It should enqueue by finding packets that have similar priorities, not changing the priorities of current packets.
        packet_str = (packet.to_string() + "END").encode()
        heapq.heappush(self.queue_send, (packet.priority, packet_str))


    def ingest(self, packet_str):
        """ Prints any packets received """
#        print("Ingesting:", packet_str)
        packet_str = packet_str.decode()
        packet_strs = packet_str.split("END")[:-1]
        packets = [Packet.from_string(p_str) for p_str in packet_strs]
        #packet = Packet.from_string(packet_str)
        for packet in packets:
            for log in packet.logs:
                log.timestamp = round(log.timestamp, 1)   #########CHANGE THIS TO BE TIMESTAMP - START TIME IF PYTHON
#                print("Timestamp:", log.timestamp)
                if "heartbeat" in log.header or "stage" in log.header or "response" in log.header or "mode" in log.header:
                    self.update_general(log.__dict__)

                if "sensor_data" in log.header:
                    self.update_sensor_data(log.__dict__)

                if "valve_data" in log.header:
                    self.update_valve_data(log.__dict__)
                
                log.save()

    def heartbeat(self):
        """ Constantly sends heartbeat message """
        while True:
            log = Log(header="heartbeat", message="AT")
            self.enqueue(Packet(logs=[log], priority=LogPriority.INFO))
            print("Sent heartbeat")
            time.sleep(DELAY_HEARTBEAT)

    ## backend methods

    def update_general(self, log):
        print("General:", log)
        self.socketio.emit('general', log, broadcast=True)
    
    
    def update_sensor_data(self, log):
        print("Sensor:", log)
        self.socketio.emit('sensor_data', log, broadcast=True)

    
    def update_valve_data(self, log):
        print("Valve:", log)
        self.socketio.emit('valve_data', log, broadcast=True)


    def on_button_press(self, data):
        print(data)
        log = Log(header=data['header'], message=data['message'])
        self.enqueue(Packet(logs=[log], priority=LogPriority.INFO))
