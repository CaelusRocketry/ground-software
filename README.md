# Ground Software

Ground software for Project Caelus.

There are two parts to this software:

- __client__: `/client`
- __server__: `/server`

## Setup

### Server

Under __server__, install the necessary Python packages with the following command:

```
pip3 install -r requirements.txt
``` 

#### Connecting to XBee
Edit the `XBEE_PORT` variable in `server/config.json` to connect the server to the port the XBee is attached to.

##### Windows
`XBEE_PORT` should be of the form `COM<number>`, for example `COM3`.

##### Linux
`XBEE_PORT` should be of the form `/dev/ttyUSB<number>`, for example `/dev/ttyUSB0`.
Additionally, run `sudo adduser $USER dialout` and logout and login again to gain access to the USB device.
If this doesn't work, try running `sudo chmod 666 /dev/ttyUSB<number`.


### Client

First, download Node.js if you haven't already, and add this variable to the your system's path:

- Name: `NODE_OPTIONS`
- Value: `--max-old-space-size=8192`

Then, under __client__, install the necessary dependencies:

```sh
npm install
```

## Run

Under __client__, run (might be __client/src__ in Windows 11):

```
npm start
```

Under __server__, run:

```
python main.py
```

This program won't terminate; as soon as you see some output (that's not an error), move on to the next step.

Finally, follow the instructions in the flight software README to run the latest flight software local simulation, 
and head over to the client web page which holds our software interface!
