const { io } = require('../server');
const { TicketControl } = require('../classes/ticket-control');


const ticketControl = new TicketControl();

io.on('connection', (client) => {


    // Escuchar el cliente
    client.on('siguienteTicket', (data, callback) => {

        let siguiente = ticketControl.siguiente();

        callback(siguiente)


    });

    //emitir un evento 'estadoActual'
    client.on('estadoActual', (data, callback) => {
        let estadoActual = ticketControl.getUltimoTicket();
        let ultimos4 = ticketControl.getUltimos4();
        callback({ estadoActual, ultimos4 });

    });

    client.on('atenderTicket', (data, callback) => {
        if (!data.escritorio) {
            return callback({
                err: true,
                mensaje: 'el escritorio es nesesario'
            });
        }

        console.log(data.escritorio);

        let atenderTicket = ticketControl.atenderTicket(data.escritorio);

        callback(atenderTicket);

        // actualizar cambios en los ultimos 4
        let ultimos4 = ticketControl.getUltimos4();

        client.broadcast.emit('ultimos4', ultimos4);

    })


});