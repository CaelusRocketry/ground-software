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
        val = sum(ord(c) * i for i, c in enumerate(packet_str)) % 999
        packet_str += "|" + str(val)
        return packet_str

        return packet_str


    @staticmethod
    def from_string(input_string):
        input_list = input_string.split("|")
        checksum = int(input_list[3])
        og_str = input_list[0] + "|" + input_list[1] + "|" + input_list[2]
        # print(og_str)
        val = sum(ord(c) * i for i, c in enumerate(og_str)) % 999
        # print(val)

        if val != checksum:
            raise Exception("Invalid checksum, packet did not send correctly")

        packet = Packet(
            header= input_list[0],
            message= input_list[2],
            timestamp= int(input_list[1], 16) / 1000.0
        )

        return packet

    def to_dict(self):
        header_map = {
            "HRT": "heartbeat",
            "SAB": "mode",
            "UAB": "mode",
            "AAB": "response",
            "SAC": "response",
            "SDT": "response",
            "DAT": "sensor_data",
            "VST": "response",
            "VDT": "valve_data",
            "SGP": "stage_progress",
            "SPQ": "response",
            "SGD": "stage",
            "INF": "response"
        }

        inner_header_map = {
            "HRT": "heartbeat",
            "SAB": "mode",
            "UAB": "mode",
            "AAB": "response",
            "SAC": "Valve actuation",
            "SDT": "Sensor data",
            "DAT": "sensor_data",
            "VST": "Valve data request",
            "VDT": "valve_data",
            "SGP": "Stage progression",
            "SPQ": "Stage progression request",
            "SGD": "stage_data",
            "INF": "info"
        }


        ret = {"header": header_map[self.header], "timestamp": self.timestamp, "message": {"timestamp": self.timestamp}}

        if "DAT" in self.header:
            # type, location, value in hex

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
                "9": "Thermo-1"
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

        elif "VDT" in self.header:
            # type, location, state

            valve_type_inverse_map = {"0": "solenoid"}
            valve_location_inverse_map = {
                "1": "ethanol_pressurization",
                "2": "ethanol_vent",
                "3": "ethanol_mpv",
                "4": "nitrous_pressurization",
                "5": "nitrous_fill",
                "6": "nitrous_mpv"
            }
            
            valves = self.message.split(",")
            
            for valve_str in valves:
                valve_type = valve_type_inverse_map[valve_str[0]]
                valve_location = valve_location_inverse_map[valve_str[1]]
                valve_state = int(valve_str[2])

                if valve_type not in ret["message"]:
                    ret["message"][valve_type] = {}
                
                ret["message"][valve_type][valve_location] = valve_state

            # print("\n\n\n\n\n\n\AYO\n\n\nLOOK\n\VALVE DATA\n")
            # print(ret)
            # print("\n\n\n")

        elif "HRT" in self.header:
            ret["message"]["message"] = "OK"

        elif "SAB" in self.header:
            ret["message"]["mode"] = "Soft Abort"

        elif "UAB" in self.header:
            ret["message"]["mode"] = "Normal"

        elif "SGP" in self.header:
            split_msg = self.message.split("-")
            
            if split_msg[1] == "1":
                stage_name_inverse_map = {
                    "1": "waiting",
                    "2": "pressurization",
                    "3": "autosequence",
                    "4": "postburn",
                }

                ret["message"]["header"] = inner_header_map[self.header]
                ret["message"]["message"] = "Successfully progressed to " + stage_name_inverse_map[split_msg[0]]

        elif "SPQ" in self.header:
            stage_name_inverse_map = {
                "1": "waiting",
                "2": "pressurization",
                "3": "autosequence",
                "4": "postburn",
            }

            ret["message"]["header"] = inner_header_map[self.header]
            ret["message"]["message"] = "Rocket is ready to progress to " + stage_name_inverse_map[self.message[1]] + ". Waiting on Ground Station confirmation to progress."

        elif "SGD" in self.header:
            stage_name_inverse_map = {
                "1": "waiting",
                "2": "pressurization",
                "3": "autosequence",
                "4": "postburn",
            }

            ret["message"]["stage"] = stage_name_inverse_map[self.message[0]]
            ret["message"]["status"] = int(self.message[1:])

            # print("\n\n\n\n\n\n\AYO\n\n\nLOOK\n\STAGE DATA\n")
            # print(ret)
            # print("\n\n\n")

        else:
            ret["message"]["header"] = inner_header_map[self.header]
            ret["message"]["message"] = self.message


        return ret

    def save(self):
        # TODO: IMPLEMENT LOGGING TO BLACKBOX OR DATABASE OR SOMETHING
        pass

    def __lt__(self, other):
        return other.timestamp - self.timestamp


    def __cmp__(self, other):
        return other.timestamp - self.timestamp