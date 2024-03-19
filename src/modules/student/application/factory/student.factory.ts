import { generateUUID } from '@shared/application/helpers/id.helper';
import { Password } from '@shared/application/helpers/password.helper';
import { StudentPassword } from '@student/domain/entity/password.entity';
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

    static async hashPassword(password: string, student_id: string): Promise<StudentPassword> {
        return new StudentPassword({
            id: generateUUID(),
            value: await Password.hash(password),
            student_id: student_id
        });
    }
}