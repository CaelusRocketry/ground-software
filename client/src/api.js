import io from 'socket.io-client';
import { updateSensorData, updateValveData, updateHeartbeat, updateHeartbeatStatus, generalPressed, abortPressed, requestPressed, actuatePressed, updateStage, addResponse } from './store/actions';
import { useSelector, useStore, useDispatch } from "react-redux";

const socket = io('http://localhost:5000');

const socketConnection = (store) => {
    socket.on('general', function(log){
//        console.log(log);
//        console.log("Header: " + log.header);
        if(log.header === 'heartbeat'){
            store.dispatch(updateHeartbeat(log));
//            store.dispatch(addResponse(log));
        }
        else if(log.header === 'stage'){
            store.dispatch(updateStage(log));
//            store.dispatch(addResponse(log));
        }
        else if(log.header === 'response'){
            store.dispatch(addResponse(log));
        }
        else{
            console.log("Unknown general header");
        }
    });

    socket.on('sensor_data', function(log){ 
//        console.log(log);
//        console.log("Header: " + log.header);
        store.dispatch(updateSensorData(log));
    });

    socket.on('valve_data', function(log){ 
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
        if(buttons.request.valve[0] != undefined){
            header = "valve_request"; message = {"valve_type": buttons.request.valve[0], "valve_location": buttons.request.valve[1]};
            store.dispatch(requestPressed({type: "valve", objectType: undefined, location: undefined}));
            sendMessage(header, message);
        }
        if(buttons.request.sensor[0] != undefined){
            header = "sensor_request"; message = {"sensor_type": buttons.request.sensor[0], "sensor_location": buttons.request.sensor[1]};
            store.dispatch(requestPressed({type: "sensor", objectType: undefined, location: undefined}));
            sendMessage(header, message);
        }
        if(buttons.general.progress){
            header = "progress"; message = {};
            store.dispatch(generalPressed({type: "progress", pressed: false}));
            sendMessage(header, message);
        }
        for(let valve in buttons.actuation){
            let [type, priority] = buttons.actuation[valve];
            if(type === null || type === undefined || priority === null || priority === undefined){
                continue;
            }
            header = "solenoid_actuate"; message = {"valve_location": valve, "actuation_type": type, "priority": priority};
            console.log(type + " " + priority);
            console.log("Dispatching null");
            store.dispatch(actuatePressed({valve: valve, type: undefined, priority: undefined}));
            console.log(store.getState());
            sendMessage(header, message);
        }
    }

    store.subscribe(handleChange);

}

const heartbeatError = (store) => {
    let general = store.getState().data.general;
    let curr = Date.now();

    if(general.heartbeat == undefined) store.dispatch(updateHeartbeatStatus(1));
    else if(curr - general.heartbeat_recieved > 10000) store.dispatch(updateHeartbeatStatus(1));
    else if(curr - general.heartbeat_recieved > 6000) store.dispatch(updateHeartbeatStatus(2));
    else store.dispatch(updateHeartbeatStatus(3));
}

export {socketConnection, heartbeatError} 
