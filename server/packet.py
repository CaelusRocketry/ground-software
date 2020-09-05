import time
import json
from enum import IntEnum


class LogPriority(IntEnum):
    """ Level Enum indicates the priority or status of the Packet """
    INFO = 4
    DEBUG = 3
    WARN = 2
    CRIT = 1


class Log:
    """ Packet class stores messages to be sent to and from ground and flight station """

    def __init__(self, header, message={},
                 timestamp: float = time.time()):
        self.header = header
        self.message = message
        self.timestamp = timestamp
        self.save()


    def save(self, filename = "blackbox.txt"):
        f = open("black_box.txt", "a+")
        f.write(self.to_string() + "\n")
        f.close()


    def to_string(self):
#        print(self.__dict__)
        return json.dumps(self.__dict__)


    @staticmethod
    def from_string(input_string):
        input_dict = json.loads(input_string)
        log = Log(header=input_dict['header'], message=input_dict['message'], timestamp=input_dict['timestamp'])
        log.__dict__ = input_dict
        return log


class Packet:
    """ Packet class stores messages to be sent to and from ground and flight station """

    def __init__(self, logs: list = [], level: LogPriority = LogPriority.INFO, timestamp: float = time.time()):
        self.logs = logs
        self.timestamp = timestamp
        self.level = level


    def add(self, log: Log):
        self.logs.append(log)


    def to_string(self):
        output_dict = self.__dict__
        output_dict["logs"] = [log.to_string() for log in output_dict["logs"]]
        return json.dumps(self.__dict__)


    @staticmethod
    def from_string(input_string):
        print("in packet from_string:")
        print(input_string)
        input_dict = json.loads(input_string)
        input_dict["logs"] = [Log.from_string(log_str) for log_str in input_dict["logs"]]
        packet = Packet()
        packet.__dict__ = input_dict
        return packet
    

    def __cmp__(self, other):
        return self.level - other.level
