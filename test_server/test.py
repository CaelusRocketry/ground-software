import socket

sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
sock.bind(("localhost", 8080))
sock.listen(1)
conn, addr = sock.accept()
print(conn.recv(1024))
conn.send("Wassup?".encode())