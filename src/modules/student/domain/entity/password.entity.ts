import { Entity } from '@shared/domain/entities/base.entity';

export class StudentPassword extends Entity {
    value: string;
    student_id: string;

    constructor(studentPassword: StudentPassword) {
        super(studentPassword.id);
        Object.assign(this, studentPassword);
    }
}