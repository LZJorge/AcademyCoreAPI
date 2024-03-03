import { z } from 'zod';
import { BaseSchema } from '@shared/infrastructure/schema/base.schema';
import { userValues } from '@user/domain/values/user.values';
import { IDniDto } from '@user/application/dto/dni.dto';

/**
 * This class definition extends the BaseSchema class and initializes a schema for validating an update user data transfer object (DTO).
 */
export class DniSchema extends BaseSchema<IDniDto> {
    constructor() {
        const schema = z.object({
            dni: z
                .string()
                .trim()
                .regex(userValues.dni.regex),
        });

        super(schema);
    }
}