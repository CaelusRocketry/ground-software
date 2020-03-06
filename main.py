import time
import json
import threading

from modules.log import Log
from modules.server import Server
#from modules.telemetry import Telemetry

config = json.loads(open("config.json").read())
f = open("black_box.txt", "w+")
f.close()


if __name__ == "__main__":
#    telem = Telemetry(config)
#    telem.begin()
    server = Server('wrap')
    server.run()

    Log(header="INFO", message="Listening and Sending")


    # while True:
    #     temp = input("")
    #     header = temp[:temp.index(" ")]
    #     message = temp[temp.index(" ") + 1:]
    #     pack = Packet(header=header)
    #     log = Log(header=header, message=message)
    #     pack.add(log)
    #     enqueue(Packet(header="MESSAGE", logs=[log]))