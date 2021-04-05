from queue import Empty, Queue
import time
import heapq
import socket
import threading
from typing import Any, List, Tuple, Union
from packet import Packet, Log, LogPriority
from flask_socketio import Namespace
import json
import boto3
from decimal import Decimal

# CREATE TABLE
dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('CallistoData')

# INSERT SENSORS
"""config = json.loads(open("config.json").read())
data = {'sensors': {}}
for sensor_type in config['sensors']['list']:
    data['sensors'][sensor_type] = {}
    for sensor in config['sensors']['list'][sensor_type]:
        data['sensors'][sensor_type][sensor] = []
table.put_item(Item={'Data Type': 'sensorData', 'Data': data})"""


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
        self.queue_send: List[Tuple[str, str]] = []
        
        self.send_thread = threading.Thread(target=self.send, daemon=True)
        self.send_thread.daemon = True
        self.listen_thread = threading.Thread(target=self.listen, daemon=True)
        self.listen_thread.daemon = True
        self.heartbeat_thread = threading.Thread(target=self.heartbeat, daemon=True)
        self.heartbeat_thread.daemon = True
        # This is a queue of arguments to be sent to self.ingest()
        self.ingest_queue = Queue()
        # This thread reads from the ingest queue
        self.ingest_thread = threading.Thread(target=self.ingest_loop, daemon=True)
        self.ingest_thread.daemon = True

        self.conn = None
        self.running = False

        self.socketio = socketio
        self.socketio.on_event(
            'json',
            self.send_to_flight_software
        )
        
        self.connect(ip, port)
        self.INITIAL_TIME = time.time()
        # INSERT INITIAL TIME
        table.put_item(
            Item={
                'Data Type': 'Initial Time',
                'Data': Decimal(str(self.INITIAL_TIME))
            }
        )
        
        self.general_copy = None
        self.sensors_copy = None
        self.valves_copy = None
        self.buttons_copy = None

    ## telemetry methods

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
        (self.conn, _addr) = self.sock.accept()
        
        print("Finished connecting")


    def begin(self):
        """ Starts the send and listen threads """
        self.running = True
        self.listen_thread.start()
        self.heartbeat_thread.start()
        self.send_thread.start()
        self.ingest_thread.start()


    def send_to_flight_software(self, json):
        log = Log(header=json['header'], message=json['message'], timestamp=time.time()-self.INITIAL_TIME)
        self.enqueue(Packet(logs=[log], timestamp=log.timestamp))

    def send(self):
        """ Constantly sends next packet from queue to ground station """
        while self.running:
            try:
                if self.queue_send and SEND_ALLOWED:
                    _, encoded = heapq.heappop(self.queue_send)
                    self.conn.send(encoded)
                    print("Sending:", encoded)
                time.sleep(DELAY_SEND)
            except Exception as e:
                print("ERROR:", e)
                self.running = False


    def listen(self):
        """ Constantly listens for any from ground station """
        while self.running:
            data = self.conn.recv(BYTE_SIZE)
            if data:
                self.ingest_queue.put(data)


    def enqueue(self, packet):
        """ Encrypts and enqueues the given Packet """
        # TODO: This is implemented wrong. It should enqueue by finding packets that have similar priorities, not changing the priorities of current packets.
        packet_str = (packet.to_string() + "END").encode("ascii")
        heapq.heappush(self.queue_send, (packet.priority, packet_str))

    
    def ingest_loop(self):
        """ Constantly ingests queue data, blocking until an item is available from the queue """
        while self.running:
            # block=True waits until an item is available
            # We add a timeout so the loop can stop
            try:
                data = self.ingest_queue.get(block=True, timeout=1)
                self.ingest(data)
            except Empty:
                pass


    def ingest(self, packet_str):
        """ Prints any packets received """
        packet_str = packet_str.decode()
        packet_strs = packet_str.split("END")[:-1]
        packets = [Packet.from_string(p_str) for p_str in packet_strs]
        for packet in packets:
            for log in packet.logs:
                log.timestamp = round(log.timestamp, 1)   #########CHANGE THIS TO BE TIMESTAMP - START TIME IF PYTHON
                if "heartbeat" in log.header or "stage" in log.header or "response" in log.header or "mode" in log.header:
                    self.update_general(log.__dict__)

                if "sensor_data" in log.header:
                    self.update_sensor_data(log.__dict__)

                if "valve_data" in log.header:
                    self.update_valve_data(log.__dict__)
                
                log.save()

    def heartbeat(self):
        """ Constantly sends heartbeat message """
        while self.running:
            log = Log(header="heartbeat", message="AT", timestamp=time.time()-self.INITIAL_TIME)
            self.enqueue(Packet(logs=[log], priority=LogPriority.INFO, timestamp=log.timestamp))
            print("Sent heartbeat")
            time.sleep(DELAY_HEARTBEAT)

    ## backend methods
    def update_general(self, log):
        log_send('general', log)
        self.socketio.emit('general', log, broadcast=True)
    
    
    def update_sensor_data(self, log):
        data = {'sensors': {}, 'timestamps': []}
        sensors = data['sensors']
        timestamps = data['timestamps']

        for s_type, locations in log['message'].items():
            for location, sensor in locations.items():
                measured = sensor['measured']
                kalman = sensor['kalman']
                status = sensor['status']

                if not s_type in sensors:
                    sensors[s_type] = {}
                if not location in sensors[s_type]:
                    sensors[s_type][location] = []

                sensor_stored = sensors[s_type][location]
                sensor_stored.append({'measured': Decimal(str(measured)), 'kalman': Decimal(str(kalman))})

        timestamps.append(Decimal(str(log['timestamp'])))
        table.put_item(Item={'Data Type': 'sensorData', 'Data': data})

        log_send('sensor', log)
        self.socketio.emit('sensor_data', log, broadcast=True)

    
    def update_valve_data(self, log):
        data = {'valves': {}}
        for (valve_type, locations) in log['message'].items():
            data['valves'][valve_type] = {}
            for (location, valve) in locations.items():
                data['valves'][valve_type][location] = valve
        data['timestamp'] = Decimal(str(log['timestamp']))
        table.put_item(Item={'Data Type': 'valveData', 'Data': data})
        
        log_send('valve', log)
        self.socketio.emit('valve_data', log, broadcast=True)

    def update_store_data(self):
        self.socketio.emit('general_copy', self.general_copy)
        self.socketio.emit('sensors_copy', self.sensors_copy)
        self.socketio.emit('valves_copy', self.valves_copy)
        self.socketio.emit('buttons_copy', self.buttons_copy)
        self.socketio.emit('initial_time', self.INITIAL_TIME)

    ## store copy methods
    def update_general_copy(self, general):
        self.general_copy = general

    def update_sensors_copy(self, sensors):
        self.sensors_copy = sensors

    def update_valves_copy(self, valves):
        self.valves_copy = valves

    def update_buttons_copy(self, buttons):
        self.buttons_copy = buttons

    def on_button_press(self, data):
        log_send('button', data)
        if data['header'] == 'update_general':
            self.update_general_copy(data['message'])
        elif data['header'] == 'update_sensors':
            self.update_sensors_copy(data['message'])
        elif data['header'] == 'update_valves':
            self.update_valves_copy(data['message'])
        elif data['header'] == 'update_buttons':
            self.update_buttons_copy(data['message'])
        elif data['header'] == 'store_data':
            self.update_store_data()
        else:
            print(data)
            log = Log(header=data['header'], message=data['message'], timestamp=time.time()-self.INITIAL_TIME)
            self.enqueue(Packet(logs=[log], priority=LogPriority.INFO, timestamp=log.timestamp))

hidden_log_types = set() # {"general", "sensor", "valve", "button"}
def log_send(type, log):
    if type not in hidden_log_types:
        print(f"Sending [{type}] {log}")