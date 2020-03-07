
$(document).ready(function(){

    // sending a connect request to the server
    namespace = '/';
    var socket = io(namespace);

    // An event handler for a change of value 
    $('input.sync').on('input', function(event) {
        socket.emit('slider_value_changed', {who: $(this).attr('id'), data: $(this).val()});
        return false;
    });

    $('#button').on('click', function() {
        socket.emit('button_pressed', '~pushed~');
        console.log('The button has been pressed');
    });

    socket.on('update text', function(msg){
        // $('#p1').val(msg.data)
        console.log('Message from FS:', msg);
    });

    socket.on('after connect', function(msg){
        console.log('After connect', msg);
    });
    
});