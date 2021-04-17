import serial
import time

ser = serial.Serial("COM6", 9600)
while True:
    data = self.ser.read(self.ser.in_waiting).decode()
    if data:
        print("Just got:", data)
    time.sleep(0.1)
