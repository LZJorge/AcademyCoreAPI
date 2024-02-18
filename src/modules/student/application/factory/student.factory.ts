import { generateUUID } from '@shared/infrastructure/helpers/id.helper';
import { Student } from '@student/domain/entity/student.entity';

export class StudentFactory {
    static create(user_id: string): Student {
        return new Student({
            id: generateUUID(),
            courses_completed: 0,
            is_active: true,
            user_id: user_id
        });
    }
}