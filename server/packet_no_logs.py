import time
import json
from enum import IntEnum
from typing import List

class PacketPriority(IntEnum):
    """ PacketPriority Enum indicates the priority or status of the Packet """

    INFO = 4
    DEBUG = 3
    WARN = 2
    CRIT = 1


class Packet:
    """ Packet class stores messages to be sent to and from ground and flight station """
    
    def __init__(self, header, message={}, timestamp: int = None, priority: PacketPriority = PacketPriority.INFO):
        self.header = header
        self.message = message
        self.timestamp = timestamp  // IN MILLIS
        self.priority: priority
        self.checksum = self.calc_checksum()

        if self.timestamp is None:
            raise Exception("Timestamp not specified")

    def calc_checksum(self):
        packet_str = self.header + "|" + (str) (self.timestamp) + "|" + self.message
        val = sum(ord(c)*i for i, c in enumerate(packet_str))
        return val

    def save(self, filename="blackbox.txt"):
        f = open(filename, "a+")
        f.write(self.to_string() + "\n")
        f.close()


    def to_json(self):
        return {
            "header": self.header,
            "message": self.message,
            "timestamp": self.timestamp
            "priority": self.priority
            "checksum": self.checksum
        }


    def to_string(self):
        packet_str = self.header + "|" + (str) (self.timestamp) + "|" + self.message + "|" self.priority + "|" (str) (self.checksum)
        return packet_str

    @staticmethod
    def from_string(input_string):
        input_list = input_string.split("|")
                
        packet = Packet(
            header= input_list[0],
            message= input_list[1],
            timestamp= int(input_list[3]),
            priority= int(input_list[4]),
            checksum= int(input_list[5])
        )
        return packet

    def __lt__(self, other):
        if self.priority != other.priority:
           return self.priority - other.priority
        return other.timestamp - self.timestamp


    def __cmp__(self, other):
        if self.priority != other.priority:
            return self.priority - other.priority
        return other.timestamp - self.timestamp
