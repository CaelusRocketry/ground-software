import time
import json
from enum import IntEnum

# Level Enum indicates the priority or status of the Packet
class Level(IntEnum):
    INFO = 4
    DEBUG = 3
    WARN = 2
    CRIT = 1

# Packet class stores messages to be sent to and from ground and flight station
class Log:

    def __init__(self, header='heartbeat', message="alive", level: Level = Level.INFO,
                 timestamp: float = time.time(), sender="Flight Pi"):
        self.header = header
        self.message = message
        self.level = level
        self.timestamp = timestamp
        self.sender = sender

    def to_string(self):
        print(self.__dict__)
        return json.dumps(self.__dict__)

    def from_string(input_string):
        input_dict = json.loads(input_string)
        packet = Log()
        packet.__dict__ = input_dict
        return packet

# Packet class stores messages to be sent to and from ground and flight station
class Packet:

    def __init__(self, header='heartbeat', logs: list = [], level: Level = Level.INFO, timestamp: float = time.time()):
        self.header = header
        self.logs = logs
        self.timestamp = timestamp
        self.level = level

    def add(self, log: Log):
        self.logs.append(log)
        self.level = min(self.level, log.level)

    def to_string(self):
        output_dict = self.__dict__
        output_dict["logs"] = [log.to_string() for log in output_dict["logs"]]
        return json.dumps(self.__dict__)

    def from_string(input_string):
        input_dict = json.loads(input_string)
        print(input_dict)
        input_dict["logs"] = [Log.from_string(log_str) for log_str in input_dict["logs"]]
        packet = Packet()
        packet.__dict__ = input_dict
        return packet

