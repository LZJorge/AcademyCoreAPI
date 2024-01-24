import { BaseError } from '@shared/domain/exceptions/base.exception';
import { HttpStatus } from '@shared/domain/exceptions/http.statusCodes';

export class EntityValidationError extends BaseError {
    constructor(data: object) {
        super('Error on provided entity data', HttpStatus.UNPROCESSABLE_ENTITY, {
            ...data
        });
        this.name = 'Validation Error';
    }
}