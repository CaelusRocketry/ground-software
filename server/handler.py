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
import serial

USE_XBEE = True

BYTE_SIZE = 16384

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

    def init(self, config, socketio):
        self.using_xbee = config["telemetry"]["USING_XBEE"]
        """ Based on given IP and port, create and connect a socket """

        """ A heapqueue of packets to send """
        self.queue_send: List[Tuple[str, str]] = []
        
        self.send_thread = threading.Thread(target=self.send, daemon=True)
        self.send_thread.daemon = True
        if self.using_xbee:
            self.listen_thread = threading.Thread(target=self.listen_xbee, daemon=True)
        else:
            self.listen_thread = threading.Thread(target=self.listen_socket, daemon=True)
        self.listen_thread.daemon = True
        self.heartbeat_thread = threading.Thread(target=self.heartbeat, daemon=True)
        self.heartbeat_thread.daemon = True
        # This is a queue of arguments to be sent to self.ingest()
        self.ingest_queue = Queue()
        # This thread reads from the ingest queue
        self.ingest_thread = threading.Thread(target=self.ingest_loop, daemon=True)
        self.ingest_thread.daemon = True
        self.running = False
        self.INITIAL_TIME = time.time()

        if self.using_xbee:
            self.ser = None
            self.connect_xbee(config["telemetry"]["XBEE_PORT"], config["telemetry"]["XBEE_BAUD_RATE"])
            self.rcvd = ""
        else:
            self.conn = None
            self.connect_socket(config["telemetry"]["GS_IP"], config["telemetry"]["SOCKET_PORT"])

        self.general_copy = None
        self.sensors_copy = None
        self.valves_copy = None
        self.buttons_copy = None

        self.socketio = socketio
        self.socketio.on_event(
            'json',
            self.send_to_flight_software
        )

    ## telemetry methods

    def connect_socket(self, ip, port):
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

    def connect_xbee(self, port, baud):
        try:
            self.ser = serial.Serial(port, baud)
            self.ser.flushInput()
            self.ser.flushOutput()
            self.INITIAL_TIME = time.time()
            print("Finished connecting")

        except Exception as e:
            print("ERROR:", e)
            self.running = False


    def begin(self):
        """ Starts the send and listen threads """
        self.running = True
        self.listen_thread.start()
        self.heartbeat_thread.start()
        self.send_thread.start()
        self.ingest_thread.start()


    def send_to_flight_software(self, dct):
        log = Log(header=dct['header'], message=json.dumps(dct['message']), timestamp=time.time()-self.INITIAL_TIME)
        self.enqueue(Packet(logs=[log], timestamp=log.timestamp))


    def send(self):
        """ Constantly sends next packet from queue to ground station """
        while self.running:
            try:
                if self.queue_send and SEND_ALLOWED:
                    _, encoded = heapq.heappop(self.queue_send)
                    if USE_XBEE:
                        subpackets = [encoded[i:255+i] for i in range(0, len(encoded), 255)] #split into smaller packets of 255
                        for subpacket in subpackets:
                            print("Writing:", subpacket)
                            self.ser.write(subpacket)
                    else:
                        self.conn.send(encoded)
                    print("Sent packet:", encoded, len(encoded))
                    time.sleep(DELAY_SEND)
            except Exception as e:
                print("ERROR:", e)
                self.running = False


    def listen_xbee(self):
        """ Constantly listens for any from ground station """
        while self.running:
            data = self.ser.read(self.ser.in_waiting).decode()
            if data:
                self.rcvd += data
                # print("Just got:", data)

            packet_start = self.rcvd.find("^")
            if packet_start != -1:
                packet_end = self.rcvd.find("$", packet_start)
                if packet_end != -1:
                    incoming_packet = self.rcvd[packet_start+1:packet_end]
                    self.ingest_queue.put(incoming_packet)
                    self.rcvd = self.rcvd[packet_end+1:]
            time.sleep(DELAY_LISTEN)

    def listen_socket(self):
        """ Constantly listens for any from ground station """
        while self.running:
            data = self.conn.recv(BYTE_SIZE)
            if data:
                self.ingest_queue.put(data)
            time.sleep(DELAY_LISTEN)



    def enqueue(self, packet):
        """ Encrypts and enqueues the given Packet """
        # TODO: This is implemented wrong. It should enqueue by finding packets that have similar priorities, not changing the priorities of current packets.
        packet_str = (packet.to_string() + "$").encode("ascii")
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
            # packet_str = packet_str.decode()
            # print("Received: " + packet_str)
            if "$" in packet_str:
                packet_strs = packet_str.split("$")[:-1]
            else:
                packet_strs = [packet_str]
                
            print(packet_strs)
            # print('AAAAAAAAAAAAAAAJJJJJJJJJJJJJJJJ')
            packets = [Packet.from_string(p_str) for p_str in packet_strs]
            for packet in packets:
                for log in packet.logs:
                    log.timestamp = round(log.timestamp, 1)   #########CHANGE THIS TO BE TIMESTAMP - START TIME IF PYTHON
                    print("header: \n\n\n\n\n " + log.header)
                    if "heartbeat" in log.header or "stage" in log.header or "response" in log.header or "mode" in log.header:
                        self.update_general(log.__dict__)

                    if "sensor_data" in log.header:
                        self.update_sensor_data(log.__dict__)

                    if "valve_data" in log.header:
                        self.update_valve_data(log.__dict__)
                    
                    log.save()

        except Exception as e:
            # print('ohFN ODSNOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO')
            # print(e)
            traceback.print_exc()

    def heartbeat(self):
        """ Constantly sends heartbeat message """
        while self.running:
            # TODO: WHY IS THERE A MESSAGE?
            log = Log(header="heartbeat", message={}, timestamp=time.time()-self.INITIAL_TIME)
            self.enqueue(Packet(logs=[log], priority=LogPriority.INFO, timestamp=log.timestamp))
            # print("Sent heartbeat")
            time.sleep(DELAY_HEARTBEAT)

    ## backend methods

    def update_general(self, log):
        log_send('general', log)
        self.socketio.emit('general', log, broadcast=True)
    
    
    def update_sensor_data(self, log):
        log_send('sensor', log)
        self.socketio.emit('sensor_data', log, broadcast=True)

    
    def update_valve_data(self, log):
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
        # print(f"Sending [{type}] {log}")
        pass