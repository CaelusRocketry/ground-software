import io from 'socket.io-client';

const socket = io('http://localhost:5000');

const socketConnection = (store) => {
    socket.on('heartbeat', function(data){ console.log(data)});
    socket.on('update sensor data', function(data){ console.log(data)});
    socket.on('update valve data', function(data){ console.log(data)});
}

export {socketConnection}