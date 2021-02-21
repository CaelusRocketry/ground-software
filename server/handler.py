import time
import heapq
import socket
import threading
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
    """ Telemetry Class handles all communication """

    def init(self, ip, port, socketio):
        """ Based on given IP and port, create and connect a socket """
        self.queue_send = []
        self.connect(ip, port)
        self.start_time = time.time()

        self.socketio = socketio
        self.stats_copy = None
        self.buttons_copy = None

    ## telemetry methods

    def connect(self, ip, port):
        self.sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        self.sock.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
        print("IP:", ip, "PORT:", port)
        self.sock.bind((ip, port))
        self.sock.listen(1)
        self.conn, self.addr = self.sock.accept()
        Log("Created socket")
        print("finished running connect method")


    def init_backend(self, b):
        self.backend = b


    def begin(self):
        """ Starts the send and listen threads """
        self.send_thread = threading.Thread(target=self.send)
        self.send_thread.daemon = True
        self.listen_thread = threading.Thread(target=self.listen)
        self.listen_thread.daemon = True
        self.heartbeat_thread = threading.Thread(target=self.heartbeat)
        self.heartbeat_thread.daemon = True
        self.send_thread.start()
        self.listen_thread.start()
        self.heartbeat_thread.start()


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
        self.socketio.emit('general',  log)
    
    
    def update_sensor_data(self, log):
        print("Sensor:", log)
        self.socketio.emit('sensor_data',  log)

    
    def update_valve_data(self, log):
        print("Valve:", log)
        self.socketio.emit('valve_data',  log)

    def update_store_data(self):
        self.socketio.emit('stats_data', self.stats_copy)
        self.socketio.emit('buttons_data', self.buttons_copy)

    ## store copy methods
    def update_stats_copy(self, stats):
        self.stats_copy = stats

    def update_buttons_copy(self, buttons):
        self.buttons_copy = buttons

    def on_button_press(self, data):
        print(data)
        if data['header'] == 'update_stats':
            self.update_stats_copy(data['message'])
            return
        elif data['header'] == 'update_buttons':
            self.update_buttons_copy(data['message'])
            return
        elif data['header'] == 'store_data':
            self.update_store_data()
            return

        log = Log(header=data['header'], message=data['message'])
        self.enqueue(Packet(logs=[log], priority=LogPriority.INFO))