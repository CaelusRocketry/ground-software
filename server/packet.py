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


class Packet:
    """ Packet class stores groups of messages, which are grouped by LogPriority. """
    
    def __init__(
        self,
        header: str = "",
        message: str = "",
        timestamp: float = None
    ):

        self.header = header
        self.message = message
        self.timestamp = timestamp

        if self.timestamp is None:
            raise Exception("Timestamp not specified")


    def add(self, log):
        # self.logs.append(log)
        pass

    def to_string(self):
        packet_str = self.header + "|" + (str) (self.timestamp) + "|" + self.message
        val = sum(ord(c) * i for i, c in enumerate(packet_str))

        packet_str += "|" + str(val)


    @staticmethod
    def from_string(input_string):
        input_list = input_string.split("|")
        checksum = int(input_list[3])
        og_str = input_list[0] + "|" + input_list[1] + "|" + input_list[2]
        print(og_str)
        val = sum(ord(c) * i for i, c in enumerate(og_str)) % 999
        print(val)

        if val != checksum:
            raise Exception("Invalid checksum, packet did not send correctly")

        packet = Packet(
            header= input_list[0],
            message= input_list[2],
            timestamp= int(input_list[1], 16)
        )

        return packet

    def to_dict(self):
        header_map = {
            "HBR": "OK",
            "SAB": "mode",
            "UAB": "mode",
            "AAB": "response",
            "SAC": "Valve actuation",
            "SDT": "Sensor data",
            "DAT": "sensor_data",
            "VST": "Valve data request",
            "VDT": "valve_data",
            "SGP": "stage_progress",
            "SPQ": "Stage progression request",
            "SGD": "stage_data",
            "INF": "info"
        }


        ret = {"header": header_map[self.header], "timestamp": self.timestamp, "message": {}}

        if "DAT" in self.header:
            sensor_type_inverse_map = {"0": "thermocouple", "1": "pressure"}
            sensor_location_inverse_map = {
                "1": "PT-1", 
                "2": "PT-2", 
                "3": "PT-3", 
                "4": "PT-4", 
                "5": "PT-5", 
                "P": "PT-P", 
                "7": "PT-7", 
                "8": "PT-8", 
                "9": "Thermo1"
            } 
            
            sensors = self.message.split(",")
            
            for sensor_str in sensors:
                sensor_type = sensor_type_inverse_map[sensor_str[0]]
                sensor_location = sensor_location_inverse_map[sensor_str[1]]
                value = int(sensor_str[2:], 16)

                if sensor_type not in ret["message"]:
                    ret["message"][sensor_type] = {}
                if sensor_location not in ret["message"][sensor_type]:
                    ret["message"][sensor_type][sensor_location] = {}

                ret["message"][sensor_type][sensor_location]["measured"] = value
                ret["message"][sensor_type][sensor_location]["kalman"] = value

                # TODO: make status be the actual value

                ret["message"][sensor_type][sensor_location]["status"] = "0"

            # print("\n\n\n\n\n\n\AYO\n\n\nLOOK\n\nSENSOR DATA\n")
            # print(ret)
            # print("\n\n\n")

        return ret

    def save(self):
        # TODO: IMPLEMENT LOGGING TO BLACKBOX OR DATABASE OR SOMETHING
        pass

    def __lt__(self, other):
        return other.timestamp - self.timestamp


    def __cmp__(self, other):
        return other.timestamp - self.timestamp