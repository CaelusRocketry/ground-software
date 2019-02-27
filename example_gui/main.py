"""
finish your own program using matplotlib for active plotting, a text panel or whatever for live data readings, and also writing to a text/excel file when you receive data.
one more thing, when your run ur program, it should be ONE window that pops up and the gui displays both the live graph and the readings

django
"""
import sys
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt

data = pd.read_csv("data.csv")

enter, temp, pressure = "", 0, 0

def press(event):
    global enter, temp, pressure
    #print('press', event.key)
    sys.stdout.flush()
    if event.key == " ":
        temp, enter = float(enter), ""
    elif event.key == "enter":
        pressure, enter = float(enter), ""
        print(f"Added {temp} degree C and {pressure} kPa")
        data.loc[len(data)] = [temp, pressure]
        with open("data.csv", "a") as f:
            f.write(f"{temp},{pressure}\n")
    else:
        enter += event.key

plt.ion()
plt.gcf().canvas.mpl_connect('key_press_event', press)
while True:
    #data = pd.read_csv("data.csv")

    ax1 = plt.subplot(211)
    plt.plot(range(len(data)), data["temp"], "r")
    plt.ylabel(r"Temperature $^{\circ} C$")
    plt.xlabel("Time (entry)")
    plt.setp(ax1.get_xticklabels(), visible=False)

    ax2 = plt.subplot(212, sharex=ax1)
    plt.plot(range(len(data)), data["pressure"], "b")
    plt.ylabel("Pressure (kPa)")
    plt.xlabel("Time (entry)")

    plt.suptitle("Measurements vs. Time")
    plt.tight_layout()

    plt.pause(1)
    plt.show()
