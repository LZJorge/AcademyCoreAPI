import { z } from 'zod';
import { Result } from '@shared/domain/result/result';
import { EntityValidationError } from '@shared/domain/exceptions/entity.validation.exception';
/**
 * All dtos need to implements this class to have same method to validate
 */
export type ValidationIssue = z.ZodIssue;
export abstract class BaseDto<T extends object> {
    protected schema: z.ZodSchema;
    public data: T;

    constructor(schema: z.ZodSchema<T>, data: T) {
        this.schema = schema;
        this.data = data;
    }

    async validate(): Promise<Result<T, EntityValidationError>> {
        const result = await this.schema.safeParseAsync(this.data);
        if(!result.success && result.error) {
            return { isSuccess: false, error: new EntityValidationError(result.error.issues) };
        }
        return { isSuccess: true, value: this.data };
    }
}