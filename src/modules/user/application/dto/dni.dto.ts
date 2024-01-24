import { z } from 'zod';
import { BaseDto } from '@shared/application/dto/base.dto';
import { userValues } from '@user/domain/values/user.values';
export interface IDniDto {
    dni: string;
}
export class DniDto extends BaseDto<IDniDto> {
    constructor(data: IDniDto) {
        const schema = z.object({
            dni: z
                .string()
                .trim()
                .regex(userValues.dni.regex),
        });

        super(schema, data);
    }
}