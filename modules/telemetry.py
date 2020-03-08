import heapq
import socket
from modules.log import Packet, Log


class Telemetry:
    """ Telemetry Class handles all communication """

    def __init__(self, config):
        """ Based on given IP and port, create and connect a socket """
        # Read in config
        self.ip = config["GS_IP"]
        self.port = config["GS_PORT"]
        self.byte_size = 8192
        self.send_allowed

        # Initialize constants
        self.delay_listen = .05
        self.delay_send = .05
        self.delay_heartbeat = 3

        # Socket variables
        self.queue_send = []
        self.sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        self.sock.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
        self.sock.bind((self.ip, self.port))
        self.sock.listen(1)
        self.conn, self.addr = self.sock.accept()

        Log("Created socket")

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
            if self.queue_send and self.send_allowed:
                encoded = heapq.heappop(self.queue_send)[1]
                self.conn.send(encoded)
            time.sleep(self.delay_send)

    def listen(self):
        """ Constantly listens for any from ground station """
        while True:
            data = self.conn.recv(self.byte_size)
            self.ingest_thread = threading.Thread(
                target=self.ingest, args=(data,))
            self.ingest_thread.daemon = True
            self.ingest_thread.start()
            time.sleep(self.delay_listen)

    def enqueue(self, packet):
        """ Encripts and enqueues the given Packet """
        packet_str = packet.to_string().encode()
        heapq.heappush(self.queue_send, (packet.level, packet_str))

    def ingest(self, packet_str):
        """ Prints any packets received """
        packet = Packet.from_string(packet_str)
        for log in packet.logs:
            print(log.to_string())
            log.save()

    def heartbeat(self):
        """ Constantly sends heartbeat message """
        while True:
            log = Log(header="HEARTBEAT", message="AT")
            self.enqueue(Packet(header="HEARTBEAT", logs=[log]))
            print("Sent heartbeat")
            time.sleep(self.delay_heartbeat)
