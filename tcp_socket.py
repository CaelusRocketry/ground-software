import socket

class Telemetry:

    def __init__(self, GS_IP, GS_PORT):
        print("Creating socket")
        self.sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        self.sock.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
        self.sock.bind((GS_IP, GS_PORT))
        self.sock.listen(1)
        self.conn, addr = self.sock.accept()
        print("Created socket")
    
    def send():
        while True:
            if self.queue_send:
                encoded = heapq.heappop(self.queue_send)[1]
                self.conn.send(encoded)
            time.sleep(self.DELAY_SEND)


    def listen():
        while True:
            data = self.conn.recv(self.buffer)
            ingest_thread = threading.Thread(target=self.ingest, args=(data,))
            ingest_thread.daemon = True
            ingest_thread.start()
            time.sleep(self.DELAY_LISTEN)


    def enqueue(self, packet=Packet()):
        packet_string = packet.to_string()
        encoded = self.encode(packet_string)
        heapq.heappush(self.queue_send, (packet.level, encoded))

  
    def ingest(self, encoded):
        packet_str = decode(encoded)
        packet = Packet.from_string(packet_str)
        with open("incoming.txt", "a+") as incoming:
            incoming.write("Incoming: "+ str(packet.message)+ "\n")

    def encode(self, packet):
        cipher = AES.new(key, AES.MODE_ECB)
        return cipher.encrypt(pad(packet.encode(), self.BLOCK_SIZE))
    #    return packet.encode()


    def decode(self, message):
        cipher = AES.new(key, AES.MODE_ECB)
        return unpad(cipher.decrypt(message), BLOCK_SIZE).decode()
    #    return message.decode()


    def heartbeat(self):
        while True:
            enqueue(Packet(header="HEARTBEAT", message="At"))
            time.sleep(DELAY_HEARTBEAT)
