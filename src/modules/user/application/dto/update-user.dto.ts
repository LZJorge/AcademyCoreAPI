import { z } from 'zod';
import { BaseDto } from '@shared/application/dto/base.dto';
import { userValues } from '@user/domain/values/user.values';
export class IUpdateUserDto {
    firstname: string;
    lastname: string;
    birthdate: Date;
    phone: string;
    email: string;
}
export class UpdateUserDto extends BaseDto<IUpdateUserDto> {
    constructor(data: IUpdateUserDto) {
        const schema = z.object({
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

        super(schema, data);
    }
}