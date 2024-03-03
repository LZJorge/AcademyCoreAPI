import { z } from 'zod';
import { Result } from '@shared/domain/result/result';
import { EntityValidationError } from '@shared/domain/exceptions/entity.validation.exception';
/**
 * All schemas need to implements this class to have same method to validate
 */
export type ValidationIssue = z.ZodIssue;
export abstract class BaseSchema<T extends object> {
    protected schema: z.ZodSchema;

    constructor(schema: z.ZodSchema<T>) {
        this.schema = schema;
    }

    /**
     * Asynchronously validates the input data.
     *
     * @param {T} data - The data to be validated
     * @return {Promise<Result<T, EntityValidationError>>} A promise that resolves to the validation result
     */
    async validate(data: T): Promise<Result<T, EntityValidationError>> {
        const result = await this.schema.safeParseAsync(data);
        if(!result.success && result.error) {
            return { isSuccess: false, error: new EntityValidationError(result.error.issues) };
        }
        return { isSuccess: true, value: data };
    }
}