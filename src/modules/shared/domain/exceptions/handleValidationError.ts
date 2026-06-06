import { EntityValidationError } from '@shared/domain/exceptions/entity.validation.exception';

export function handleValidationError(errors: unknown[]) {
    if(errors.length > 0) {
        throw new EntityValidationError({ errors });
    }
}