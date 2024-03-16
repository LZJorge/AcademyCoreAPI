import { BaseError } from './base.exception';
import { HttpStatus } from './http.statusCodes'; 

export class NotUsableMethodException extends BaseError {
    statusCode = HttpStatus.METHOD_NOT_ALLOWED;

    constructor(repository: string, method: string) {
        super(method, HttpStatus.METHOD_NOT_ALLOWED, {
            name: 'NotUsableMethodException',
            description: 'The method you are trying to access is not allowed to be used.',
            repository,
            method
        });
    }
}