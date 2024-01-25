import { Entity } from '@shared/domain/entities/base.entity';
import { User } from '@user/domain/entity/user.entity';
export class Student extends Entity {
    is_active: boolean;
    courses_completed: number;
    user_id: string;
    user?: User;

    constructor(data: Student) {
        super(data.id);
        Object.assign(this, data);
    }
}