import { Entity } from '@shared/domain/entities/base.entity';
import { User } from '@user/domain/entity/user.entity';
export class Student extends Entity {
    is_active: boolean;
    courses_completed: number;
    user_id: string;
    user?: User;

    constructor(student: Student) {
        super(student.id);
        Object.assign(this, student);
    }
}