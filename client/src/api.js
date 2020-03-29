import io from 'socket.io-client';
import { updateSensorData, updateValveData, updateHeartbeat, generalPressed, abortPressed, requestPressed, actuatePressed, updateStage, addResponse } from './store/actions';


const socket = io('http://localhost:5000');

const socketConnection = (store) => {
    socket.on('general', function(log){
        console.log(log);
        console.log("Header: " + log.header);
        if(log.header == 'heartbeat'){
            store.dispatch(updateHeartbeat(log));
//            store.dispatch(addResponse(log));
        }
        else if(log.header == 'progress'){
            store.dispatch(updateStage(log));
            store.dispatch(addResponse(log));
        }
        else if(log.header == 'response'){
            store.dispatch(addResponse(log));
        }
        else{
            console.log("Unknown general header");
        }
    });

    socket.on('update sensor data', function(log){ 
        store.dispatch(updateSensorData(log));
    });

    socket.on('update valve data', function(log){ 
        store.dispatch(updateValveData(log));
    });

    const sendMessage = (header, message) => {
        let log = {header: header, message: message};
        console.log("Sending: " + log);
        socket.emit('button_press', log);
    }

    const handleChange = () => {
        let buttons = store.getState().buttonReducer;
        let header = "";
        let message = {};
        if(buttons.abort.soft){
            header = "soft_abort"; message = {};
            store.dispatch(abortPressed({type: "soft", pressed: false}));
            sendMessage(header, message);
        }
        if(buttons.abort.hard){
            header = "hard_abort"; message = {};
            store.dispatch(abortPressed({type: "hard", pressed: false}));
            sendMessage(header, message);
        }
        if(buttons.request.valve[0] != null){
            header = "valve_request"; message = {"valve_type": buttons.request.valve[0], "valve_location": buttons.request.valve[1]};
            store.dispatch(requestPressed({type: "valve", objectType: null, location: null}));
            sendMessage(header, message);
        }
        if(buttons.request.sensor[0] != null){
            header = "sensor_request"; message = {"sensor_type": buttons.request.sensor[0], "sensor_location": buttons.request.sensor[1]};
            store.dispatch(requestPressed({type: "sensor", objectType: null, location: null}));
            sendMessage(header, message);
        }
        if(buttons.general.progress){
            header = "sensor_request"; message = {"sensor_type": buttons.request.sensor[0], "sensor_location": buttons.request.sensor[1]};
            store.dispatch(generalPressed({type: "progress", pressed: false}));
            sendMessage(header, message);
        }
        for(let valve in buttons.actuation){
            let [type, priority] = buttons.actuation[valve];
            if(type === null){
                continue;
            }
            header = "solenoid_actuate"; message = {"valve_location": valve, "actuation_type": type, "priority": priority};
            store.dispatch(actuatePressed({valve: valve, type: type, priority: priority}));
            sendMessage(header, message);
        }
    }

    store.subscribe(handleChange);

}

export {socketConnection} 
