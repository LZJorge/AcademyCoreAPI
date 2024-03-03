import { BaseError } from '@shared/domain/exceptions/base.exception';
import { HttpStatus } from '@shared/domain/exceptions/http.statusCodes';

export enum StudentExceptions {
    STUDENT_NOT_FOUND = 'No se encontró ningún usuario mediante el parámetro proporcionado',
    STUDENT_ALREADY_REGISTERED = 'El usuario ya está registrado como estudiante',
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

export class StudentAlreadyRegisteredError extends BaseError {        
    constructor(id: string) {
        super(StudentExceptions.STUDENT_ALREADY_REGISTERED, HttpStatus.BAD_REQUEST, { field: 'user_id', value: id });
    }
}