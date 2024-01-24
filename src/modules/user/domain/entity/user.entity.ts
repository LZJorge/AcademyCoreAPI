import { Entity } from '@shared/domain/entities/base.entity';
export class User extends Entity {
    dni: string;
    firstname: string;
    lastname: string;
    birthdate: Date;
    email: string;
    phone: string;
    created_at: Date;
    updated_at: Date;

    constructor(data: User) {
        super(data.id);
        Object.assign(this, data);
    }
}