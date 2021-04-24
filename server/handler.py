from queue import Empty, Queue
import time
import heapq
import socket
import threading
from typing import Any, List, Tuple, Union
from packet import Packet, Log, LogPriority
from flask_socketio import Namespace
import traceback
import json
import boto3

# CREATE TABLE
dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('CallistoSensorData')

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

        self.INITIAL_TIME = time.time() # SET INITIAL TIME
        self.socketio.emit('initial_time', self.INITIAL_TIME, broadcast=True)

        self.sensor_data = {'sensors': {}, 'timestamps': []}
        self.valve_data = {'valves': {}, 'timestamp': None}
        self.heartbeat_received = 0
        self.heartbeat_status = None
        self.stage = 'waiting'
        self.countdown = 10
        self.responses = []
        self.percent_data = 0
        self.mode = 'Normal'

    def get_timestamp(self):
        return time.time() - self.INITIAL_TIME

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


    def send_to_flight_software(self, dct):
        log = Log(header=dct['header'], message=json.dumps(dct['message']), timestamp=self.get_timestamp())
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
                print("ERROR: ", e)
                self.running = False


    def listen(self):
        """ Constantly listens for any from ground station """
        while self.running:
            data = self.conn.recv(BYTE_SIZE)
            if data:
                # print("ME LIKEYYYYYY")
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
                if not self.ingest_queue.empty():
                    # print("dfjkGOOOOOD")
                    data = self.ingest_queue.get(block=True, timeout=1)
                    self.ingest(data)
            except Exception as e:
                # print('SDJFKKKKKKK=-----------------------------------------')
                # print(e)
                traceback.print_exc()


    def ingest(self, packet_str):
        """ Prints any packets received """
        try:
            packet_str = packet_str.decode()
            packet_strs = packet_str.split("END")[:-1]
            packets = [Packet.from_string(p_str) for p_str in packet_strs]
            log_map = {
                "heartbeat": self.update_heartbeat,
                "stage": self.update_stage,
                "response": self.update_response,
                "mode": self.update_mode,
                "sensor_data": self.update_sensor_data,
                "valve_data": self.update_valve_data
            }

            for packet in packets:
                for log in packet.logs:
                    log.timestamp = round(log.timestamp, 1)   #########CHANGE THIS TO BE TIMESTAMP - START TIME IF PYTHON
                    log_map[log.header](log.__dict__)                
                    log.save()
        except Exception as e:
            # print('ohFN ODSNOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO')
            # print(e)
            traceback.print_exc()

    def heartbeat(self):
        """ Constantly sends heartbeat message """
        while self.running:
            # TODO: WHY IS THERE A MESSAGE?
            log = Log(header="heartbeat", message={}, timestamp=self.get_timestamp())
            self.enqueue(Packet(logs=[log], priority=LogPriority.INFO, timestamp=log.timestamp))
            # print("Sent heartbeat")
            time.sleep(DELAY_HEARTBEAT)

    ## backend methods
    def update_heartbeat(self, log):
        self.heartbeat_received = log['timestamp']
        
        send_log = Log('heartbeat', message=self.heartbeat_received, timestamp=self.get_timestamp())
        self.socketio.emit('general', send_log.__dict__, broadcast=True)

    def update_stage(self, log):
        self.stage = log['message']['stage']
        self.percent_data = log['message']['status']
        
        send_log = Log('stage', message={'stage': self.stage, 'status': self.percent_data}, timestamp=self.get_timestamp())
        self.socketio.emit('general', send_log.__dict__, broadcast=True)

    def update_response(self, log):
        header = log['header']
        if header == "response":
          header = log['message']['header']
          del log['message']['header']

        self.responses.append({
          'header': header,
          'message': log['message'],
          'timestamp': log['timestamp'],
        })
        
        #TODO - add message compression or data cutoff
        send_log = Log('response', message={'response': self.responses}, timestamp=self.get_timestamp())
        self.socketio.emit('general', send_log.__dict__, broadcast=True)

    def update_mode(self, log):
        self.mode = log['message']['mode']
        
        send_log = Log('mode', message={'mode': self.mode}, timestamp=self.get_timestamp())
        self.socketio.emit('general', send_log.__dict__, broadcast=True)

    def update_sensor_data(self, log):
        data = self.sensor_data
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
                sensor_stored.append({'measured': measured, 'kalman': kalman})

        timestamps.append(log['timestamp'])

        send_log = Log('sensor_data', message={'sensor_data': self.sensor_data}, timestamp=self.get_timestamp())
        self.socketio.emit('sensor_data', send_log.__dict__, broadcast=True)
  
    def update_valve_data(self, log):
        data = self.valve_data
        for (valve_type, locations) in log['message'].items():
            data['valves'][valve_type] = {}
            for (location, valve) in locations.items():
                data['valves'][valve_type][location] = valve
        data['timestamp'] = log['timestamp']
        log_send('valve', log)

        send_log = Log('valve_data', message={'valve_data': self.valve_data}, timestamp=self.get_timestamp())
        self.socketio.emit('valve_data', send_log.__dict__, broadcast=True)

    def on_button_press(self, data):
        log_send('button', data)
        log = Log(header=data['header'], message=data['message'], timestamp=self.get_timestamp())
        self.enqueue(Packet(logs=[log], priority=LogPriority.INFO, timestamp=log.timestamp))

hidden_log_types = set() # {"general", "sensor", "valve", "button"}
def log_send(type, log):
    if type not in hidden_log_types:
        # print(f"Sending [{type}] {log}")
        pass