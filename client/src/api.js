import io from 'socket.io-client';
import { updateLoadData } from './store/actions';

const socket = io('http://localhost:5000');

const socketConnection = (store) => {
    socket.on('heartbeat', function(data){ console.log(data)});
    socket.on('update sensor data', function(data){ 

        // split here? - not in correct order

        dispatchEvent(updateThermocoupleData(data.thermocouple));
        dispatchEvent(updatePressureData(data.pressure));
        dispatchEvent(updateLoadData(data.load));



        console.log(data)});
    socket.on('update valve data', function(data){ console.log(data)});
}

export {socketConnection}
