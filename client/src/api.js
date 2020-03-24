import io from 'socket.io-client';
import { updateLoadData, updateThermocoupleData, updatePressureData, updateTimestamp } from './store/actions';


const socket = io('http://localhost:5000');

const socketConnection = (store) => {
    socket.on('heartbeat', function(data){ console.log(data); });
    socket.on('update sensor data', function(info){ 
        // console.log(info)

        // split here? - not in correct order


        store.dispatch(updateThermocoupleData(info.data.thermocouple));
        store.dispatch(updatePressureData(info.data.pressure));
        store.dispatch(updateLoadData(info.data.load));
        // store.dispatch(updateTimestamp(info.data.timestamp));

        
        console.log(store.getState());
    });
    socket.on('update valve data', function(data){ console.log(data); });
}

export {socketConnection}
