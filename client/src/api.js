import io from 'socket.io-client';
import { updateSensorData, updateValveData, updateHeartbeat } from './store/actions';


const socket = io('http://localhost:5000');

const socketConnection = (store) => {
    socket.on('heartbeat', function(log){ 
        // console.log(log)

        store.dispatch(updateHeartbeat(log));
        console.log(store.getState());

    
    });
    socket.on('update sensor data', function(log){ 
        // console.log(log)

        store.dispatch(updateSensorData(log));
        // console.log(store.getState());
    });

    socket.on('update valve data', function(log){ 
        // console.log(log)

        store.dispatch(updateValveData(log));
        // console.log(store.getState());
    });
}

export {socketConnection} 
