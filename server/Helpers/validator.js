global.__isNull = (value, msg) => {
    if (typeof value == 'object' && value != null) {
        for (var elm of value) {
            if (String(elm).trim() == null || String(elm).trim() == '' || String(elm).trim() == 'null' || elm == undefined) {
                throw msg;
            }
        }
    } else {
        if (String(value).trim() == null || String(value).trim() == '' || String(value).trim() == 'null' || value == undefined) {
            throw msg;
        }
    }
}

global.__maxLengthString = (value, max, msg) => {
    if (String(value).trim().length > max) {
        throw msg;
    }
}

global.__validTypeDoc = (value, msg) => {
    if (![
        global.CARNET_EXTRANJERIA.value,
        global.DNI.value,
        global.PASAPORTE.value,
        global.PTP.value].includes(value)) {
        throw msg;
    }
}

global.__alphaNumeric = (value) => {
    let pattern = /^[a-zA-Z0-9\-]*$/gm;
    return pattern.test(value);
}

global.__validNumberDoc = (number_doc, type_doc, msg) => {
    switch (type_doc) {
        case global.CARNET_EXTRANJERIA.value:
            if (number_doc >= global.CARNET_EXTRANJERIA.min && number_doc <= global.CARNET_EXTRANJERIA.max) {
                throw msg;
            }
            break;

        case global.DNI.value:
            if (number_doc >= global.CARNET_EXTRANJERIA.min && number_doc <= global.CARNET_EXTRANJERIA.max) {
                throw msg;
            }
            break;
        case global.PASAPORTE.value:
            if (number_doc >= global.CARNET_EXTRANJERIA.min && number_doc <= global.CARNET_EXTRANJERIA.max) {
                throw msg;
            }
            break;
        case global.PTP.value:
            if (number_doc >= global.CARNET_EXTRANJERIA.min && number_doc <= global.CARNET_EXTRANJERIA.max) {
                throw msg;
            }
            break;

        default:
            throw msg;
    }
}

global.__isInteger = (value, msj = ANP) => {
    if (!Number.isInteger(value)) {
        throw msj;
    }
}

global.__isNumeric = (value, msj = ANP) => {
    if (isNaN(parseFloat(value))) {
        throw msj;
    }
}