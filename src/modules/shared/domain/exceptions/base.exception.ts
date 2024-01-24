import { HttpStatus } from '@shared/domain/exceptions/http.statusCodes';
export abstract class BaseError {
    message: string;
    name = 'Error';
    statusCode: HttpStatus;
    data: object;

    constructor(message: string, status: HttpStatus, data: object) {
        Object.assign(this, { message, status, data });
    }
}