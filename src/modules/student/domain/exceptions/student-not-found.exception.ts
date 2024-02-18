import { BaseError } from '@shared/domain/exceptions/base.exception';
import { HttpStatus } from '@shared/domain/exceptions/http.statusCodes';

export enum StudentExceptions {
    STUDENT_NOT_FOUND = 'No se encontró ningún usuario mediante el parámetro proporcionado',
    INVALID_DNI = 'Ha introducido una cédula inválida',

    FIRSTNAME_TOO_SHORT = 'El nombre es demasiado corto',
    FIRST_TOO_LONG = 'El nombre es demasiado largo',

    LASTNAME_TOO_SHORT = 'El apellido es demasiado corto',
    LASTNAME_TOO_LONG = 'El apellido es demasiado largo',

    INVALID_PHONE_OPERATOR = 'La operadora del teléfono es incorrecta',
    INVALID_PHONE_LENGTH = 'Ha introducido un numero de teléfono inválido'
}

export class StudentNotFoundError extends BaseError {
    declare data: {
        field: string;
        value: string;
    };

    constructor(field: 'id' | 'dni', value: string) {
        super(StudentExceptions.STUDENT_NOT_FOUND, HttpStatus.NOT_FOUND, { field, value });
        this.data = { field, value };
    }
}