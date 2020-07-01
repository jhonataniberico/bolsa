// MSG Validators
global.ANP = 'Acción no permitida';

// Type Doc
global.CARNET_EXTRANJERIA = { value: '1', max: 12, min: 6, type: 'string' };
global.DNI = { value: '2', max: 8, min: 8, type: 'number' };
global.PASAPORTE = { value: '3', max: 12, min: 6, type: 'string' };
global.PTP = { value: '4', max: 9, min: 9, type: 'string' };

// State work
global.SOLICITADO = 'SOLICITADO';
global.ACEPTADO = 'ACEPTADO';
global.FINALIZADO = 'FINALIZADO';
global.CANCELADO = 'CANCELADO';


global.print_response_error = async (url, msg, res) => {
    const errors = [400, 401, 403];

    // Errores de base de datos
    if(msg.status == 1) {
        msg.status = 400;
    } else if(msg.status == 2) {
        msg.status = 500;
    }

    // Errores controlados
    if ( errors.some((e) => e == msg.status) && res) {
        return res.status(msg.status).send(msg);
    }

    // Errores no controlados
    console.log(`${url} ===> `, msg);
    if (msg.stack_error) {
        console.log(`${url} msg.stack_error ===> `, msg.stack_error);
    }

    if (res) {
        return res.status(500).send(msj);
    }
};