import io from 'socket.io-client';
import { updateSensorData } from './store/actions';


const socket = io('http://localhost:5000');

const socketConnection = (store) => {
    socket.on('heartbeat', function(data){ console.log(data); });
    socket.on('update sensor data', function(log){ 
        // console.log(log)

        store.dispatch(updateSensorData(log));
        console.log(store.getState());
    });
    socket.on('update valve data', function(data){ console.log(data); });
}

export {socketConnection}
