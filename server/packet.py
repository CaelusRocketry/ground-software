import time
import json
from enum import IntEnum
from typing import List

class LogPriority(IntEnum):
    """ LogPriority Enum indicates the priority or status of the Packet """

    INFO = 4
    DEBUG = 3
    WARN = 2
    CRIT = 1


class Log:
    """ Log class stores messages to be sent to and from ground and flight station """
    
    def __init__(self, header, message={}, timestamp: int = None):
        self.header = header
        self.message = message
        self.timestamp = timestamp
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
            "timestamp": self.timestamp,
            "checksum": self.checksum
        }


    def to_string(self):
        packet_str = self.header + "|" + (str) (self.timestamp) + "|" + self.message + "|" + (str) (self.checksum)
        return packet_str

    def from_string(input_string):
        input_list = input_string.split("|")
                
        log = Log(
            header= input_list[0],
            message= input_list[1],
            timestamp= int(input_list[3]),
            checksum= int(input_list[4])
        )
        return log


class Packet:
    """ Packet class stores groups of messages, which are grouped by LogPriority. """
    
    def __init__(
        self,
        logs: List[Log] = [],
        priority: LogPriority = LogPriority.INFO,
        timestamp: float = None,
    ):
        self.logs = logs
        self.timestamp = timestamp
        self.priority = priority
        if self.timestamp is None:
            raise Exception("Timestamp not specified")


    def add(self, log: Log):
        self.logs.append(log)


    def to_string(self):
        return json.dumps({
            "logs": [log.to_string() for log in self.logs],
            "timestamp": self.timestamp,
            "priority": self.priority
        })


    @staticmethod
    def from_string(input_string):
        input_dict = json.loads(input_string)
        real_logs = []
        # print('\n\n--------------------------------------------------\n\n')
        # print(input_dict)

        # for i in input_dict["logs"]: #prints message out one at a time: '{' 'm' 'e' 's' etc
        #     #thats bc input_dict["logs"] is a string not a dict
        #     print(i)
        #     print(type(i))

        if isinstance(input_dict["logs"], str):
            real_logs.append(json.loads(input_dict["logs"]))
        elif isinstance(input_dict["logs"], list) and isinstance(input_dict["logs"][0], str):
            for l in input_dict["logs"]:
                real_logs.append(json.loads(l))
        else:
            raise Exception("Invalid log type in json: the log in the json string sent from FS is neither a list nor a string \
                \n It should be one of: \n \
                {... 'logs' : '{json string stuff}' ...} \n \
                or {... 'logs': ['{json string stuff}', '{second json string}', ...] ...} \n \
                Given json: " + input_string)

        for i in range(len(real_logs)):
            if isinstance(real_logs[i]["message"], str):
                real_logs[i]["message"] = json.loads(real_logs[i]["message"]) # String to dict
        return Packet(
            [
                Log(log["header"], log["message"], log["timestamp"])
                for log in real_logs
            ],

            input_dict["priority"],
            input_dict["timestamp"],
        )

    def __lt__(self, other):
        if self.priority != other.priority:
           return self.priority - other.priority
        return other.timestamp - self.timestamp


    def __cmp__(self, other):
        if self.priority != other.priority:
            return self.priority - other.priority
        return other.timestamp - self.timestamp