import { z } from 'zod';
import { BaseSchema } from '@shared/infrastructure/schema/base.schema';
import { ICreateUserDto } from '@user/application/dto/create-user.dto';
import { userValues } from '@user/domain/values/user.values';

/**
 * This class definition extends the BaseSchema class and initializes a schema for validating an update user data transfer object (DTO).
 */
export class CreateUserSchema extends BaseSchema<ICreateUserDto> {
    constructor() {
        const schema = z.object({
            dni: z
                .string()
                .trim()
                .regex(userValues.dni.regex),

            firstname: z
                .string()
                .trim()
                .min(userValues.firstname.min)
                .max(userValues.firstname.max)
                .regex(userValues.firstname.regex, {
                    message: 'Invalid characters in firstname'
                }),

            lastname: z
                .string()
                .trim()
                .min(userValues.lastname.min)
                .max(userValues.lastname.max)
                .regex(userValues.lastname.regex, 'Invalid characters in lastname'),

            birthdate: z.
                date(),

            email: z
                .string()
                .trim()
                .email(),

            phone: z
                .string()
                .trim()
                .regex(userValues.phone.regex),
        });

        super(schema);
    }
}