export const userValues = {
    /**
     * @example
     * V-30124812
     * E-12392349
     */
    dni: {
        digits: 8,
        types: ['V', 'E'],
        regex: new RegExp(/^[VE]-\d{8}$/)
    },
    firstname: {
        min: 3,
        max: 64,
        regex: new RegExp(/^[A-Za-záéíóúñÁÉÍÓÚ]{3,64}$/)
    },
    lastname: {
        min: 3,
        max: 64,
        regex: new RegExp(/^[A-Za-záéíóúñÁÉÍÓÚ]{3,64}$/)
    },

    /**
     * @example
     * 0414-2348561
     * 0424-1515321
     * 0416-9310562
     * 0412-8932857
     */
    phone: {
        digits: 7,
        operators: ['0412', '0414', '0416', '0424'],
        regex: new RegExp(/^(0412|0414|0416|0424)-\d{7}$/)
    }
};