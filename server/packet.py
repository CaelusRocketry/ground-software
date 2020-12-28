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

    def __init__(self, header, message={}, timestamp: float = time.time()):
        self.header = header
        self.message = message
        self.timestamp = timestamp

    def save(self, filename="blackbox.txt"):
        f = open(filename, "a+")
        f.write(self.to_string() + "\n")
        f.close()

    def to_json(self):
        return {
            "header": self.header,
            "message": self.message,
            "timestamp": self.timestamp,
        }

    def to_string(self):
        return json.dumps(
            {
                "header": self.header,
                "message": self.message,
                "timestamp": self.timestamp,
            }
        )

    @staticmethod
    def from_string(input_string):
        input_dict = json.loads(input_string)
        log = Log(
            header=input_dict["header"],
            message=input_dict["message"],
            timestamp=input_dict["timestamp"],
        )
        log.__dict__ = input_dict
        return log


class Packet:
    """ Packet class stores messages to be sent to and from ground and flight station """

    def __init__(
        self,
        logs: list = [],
        level: LogPriority = LogPriority.INFO,
        timestamp: float = time.time(),
    ):
        self.logs = logs
        self.timestamp = timestamp
        self.level = level

    def add(self, log: Log):
        self.logs.append(log)

    def to_string(self):
        return json.dumps(
            {
                "logs": [log.to_json() for log in self.logs],
                "timestamp": self.timestamp,
                "priority": self.level
            }
        )

    @staticmethod
    def from_string(input_string):
        input_dict = json.loads(input_string)
        return Packet(
            [
                Log(log["header"], log["message"], log["timestamp"])
                for log in input_dict["logs"]
            ],
            input_dict["level"],
            input_dict["timestamp"],
        )

    def __cmp__(self, other):
        return self.level - other.level
