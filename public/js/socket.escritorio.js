var socket = io();

var searcParams = new URLSearchParams(window.location.search);


if (!searcParams.has('escritorio')) {
    window.location = 'index.html';
    console.log(escritorio);

    throw new Error('El escritorio es nesesario');
}

var escritorio = searcParams.get('escritorio');


$('h1').text('Escritorio ' + escritorio)
var label = $('h4');

$('button').on('click', function() {
    socket.emit('atenderTicket', { escritorio: escritorio }, function(resp) {
        console.log(resp);
        if (resp === 'No hay tickets') {
            label.text(resp)
            alert(resp)
            return;
        }
        label.text('Ticket ' + resp.numero);

    })
});