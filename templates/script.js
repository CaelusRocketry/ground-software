
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

    socket.on('after connect', function(msg){
        console.log('After connect', msg);
    });

    socket.on('slider_value_changed', function(msg) {
        console.log('Slider value updated :)');
        $('#'+msg.who).val(msg.data);
    });
    
});