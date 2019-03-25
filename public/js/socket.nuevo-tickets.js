// Comando para establecer la coneccion

var socket = io();
var label = $('#lblNuevoTicket');



socket.on('connect', function() {
    console.log('conectado al servidor ');

    socket.emit('estadoActual', null, function(ultimo) {
        label.text(ultimo.estadoActual);
    })

});

socket.on('disconnect', function() {
    console.log('se perdio coneccion');

});

$('button').on('click', function() {
    // alert()
    socket.emit('siguienteTicket', null, function(siguienteTicket) {
        console.log(siguienteTicket);
        label.text(siguienteTicket)
    });

})