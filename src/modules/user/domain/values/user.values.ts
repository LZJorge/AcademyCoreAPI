export const userValues = {
    dni: {
        digits: 8,
        types: ['V', 'E'],
        regex: new RegExp(/^[VE]-\d{8}$/)
    },
    firstname: {
        min: 2,
        max: 64,
        regex: new RegExp(/^[A-Za-záéíóúñÁÉÍÓÚ]+$/)
    },
    lastname: {
        min: 2,
        max: 64,
        regex: new RegExp(/^[A-Za-záéíóúñÁÉÍÓÚ]+$/)
    },
    phone: {
        digits: 7,
        operators: ['0412', '0414', '0416', '0424'],
        regex: new RegExp(/^(0412|0414|0416|0424)-\d{7}$/)
    }
};