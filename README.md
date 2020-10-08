# Ground Software
Ground software for Project Caelus.

## Local Setup

All necessary python libraries can be installed using the following command: 
```
pip3 install -r requirements.txt
``` 

### Change the IP values in all configs to 127.0.0.1

**Before running flight and ground software locally, you need to change all GS_IP/SOCKETIO_HOST values in the following locations to "127.0.0.1"**:
- flight-software/src/pi/hardware_config.json
- ground-software/server/config.json
- ground-software/client/src/config.json

Do **not** commit these changed values, however; this is only so that you can run this locally. **Change them back before committing.**

### Node setup (first-time install)

First, download Node.js if you haven't already, and add this variable to the System Variables section in your computer's Environment Variables if you haven't already:
- Variable name: ```NODE_OPTIONS```
- Variable value: ```--max-old-space-size=8192```

Then, navigate to the ground-software/client folder, and run this command:

```
npm i
```

### Starting the Ground Station

Navigate to the ground-software/client folder and run this command:

```
npm start
```

Then, open a new command window, navigate to the ground-software/server folder, and run:
```
python main.py
```

Finally, follow the instructions in the Flight Software README to run the latest Flight Software local simulation, and head over to the web page which holds the Ground Station interface to see our software in action!