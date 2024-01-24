import { BaseError } from '@shared/domain/exceptions/base.exception';
import { HttpStatus } from '@shared/domain/exceptions/http.statusCodes';
import { userSearchParams } from '@user/domain/values/canSearchUserBy';
import { User } from '@user/domain/entity/user.entity';

export enum UserExceptions {
    USER_NOT_FOUND = 'No se encontró ningún usuario mediante el parámetro proporcionado',
    INVALID_DNI = 'Ha introducido una cédula inválida',

    USERNAME_TOO_SHORT = 'El nombre es demasiado corto',
    USERNAME_TOO_LONG = 'El nombre es demasiado largo',

    LASTNAME_TOO_SHORT = 'El apellido es demasiado corto',
    LASTNAME_TOO_LONG = 'El apellido es demasiado largo',

    INVALID_PHONE_OPERATOR = 'La operadora del teléfono es incorrecta',
    INVALID_PHONE_LENGTH = 'Ha introducido un numero de teléfono inválido'
}

export class UserNotFoundError extends BaseError {
    declare data: {
        field: string;
        value: string;
    };

    constructor(field: 'id' | 'dni', value: string) {
        super(UserExceptions.USER_NOT_FOUND, HttpStatus.NOT_FOUND, { field, value });
        this.data = { field, value };
    }
}

export class CantSearchUserByInvalidParamError extends BaseError {
    declare data: {
        param: string;
        value: unknown;
        valid_params: Array<keyof User>
    };
    
    constructor(param: string, value: unknown) {
        super('Invalid user search param', HttpStatus.BAD_REQUEST, { param, value, valid_params: userSearchParams });
        this.data = { param, value, valid_params: userSearchParams };
    }
}