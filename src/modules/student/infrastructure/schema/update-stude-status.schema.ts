import { z } from 'zod';
import { BaseSchema } from '@shared/infrastructure/schema/base.schema';
import { IUpdateStudentStatusDto } from '@student/application/dto/update-student-status.dto';

export class UpdateStudentStatusSchema extends BaseSchema<IUpdateStudentStatusDto> {
    constructor() {
        const schema = z.object({
            is_active: z
                .boolean()
        });

        super(schema);
    }
}