import { BaseError } from '@shared/domain/exceptions/base.exception';
import { HttpStatus } from '@shared/domain/exceptions/http.statusCodes';
import { userSearchParams } from '@user/domain/values/canSearchUserBy';
import { User } from '@user/domain/entity/user.entity';

export enum UserExceptions {
    CANT_SEARCH_BY_INVALID_PARAM = 'No se puede buscar por un parámetro inválido',
    CANT_SEARCH_BY_INVALID_PARAMS = 'No se puede buscar por los parámetros proporcionados',

    DNI_ALREADY_EXISTS = 'La cédula ya existe',

    USER_NOT_FOUND = 'No se encontró ningún usuario mediante el parámetro proporcionado',
    INVALID_DNI = 'Ha introducido una cédula inválida',

    FIRSTNAME_TOO_SHORT = 'El nombre es demasiado corto',
    FIRST_TOO_LONG = 'El nombre es demasiado largo',

    LASTNAME_TOO_SHORT = 'El apellido es demasiado corto',
    LASTNAME_TOO_LONG = 'El apellido es demasiado largo',

    INVALID_PHONE_OPERATOR = 'La operadora del teléfono es incorrecta',
    INVALID_PHONE_LENGTH = 'Ha introducido un numero de teléfono inválido'
}

/**
 * 
 */
export class UserNotFoundError extends BaseError {
    declare data: {
        field: string;
        value: string;
    };

    /**
     * Constructor for creating a new instance.
     *
     * @param {'id' | 'dni'} field - the field where the user was not found
     * @param {string} value - the value of the field
     * @return {void} 
     */
    constructor(field: 'id' | 'dni', value: string) {
        super(UserExceptions.USER_NOT_FOUND, HttpStatus.NOT_FOUND, { field, value });
        this.data = { field, value };
    }
}


/**
 * 
 */
export class UserDniAlreadyExistsError extends BaseError {
    declare data: {
        dni: string;
    };
    
    constructor(dni: string) {
        super(UserExceptions.DNI_ALREADY_EXISTS, HttpStatus.BAD_REQUEST, { dni });
        this.data = { dni };
    }
}

/**
 * 
 */
export class CantSearchUserByInvalidParamError extends BaseError {
    declare data: {
        param: string;
        value: unknown;
        valid_params: Array<keyof User>
    };
    
    constructor(param: string, value: unknown) {
        super(UserExceptions.CANT_SEARCH_BY_INVALID_PARAM, HttpStatus.BAD_REQUEST, { param, value, valid_params: userSearchParams });
        this.data = { param, value, valid_params: userSearchParams };
    }
}