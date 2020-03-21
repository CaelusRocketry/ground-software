function connect(){

}

function thing(data){
    
}

socket.on('connect', connect);
socket.on('event', thing(data));
socket.on('disconnect', disconnect);