import { ICreateUserDto } from '@user/application/dto/create-user.dto';
import { User } from '@user/domain/entity/user.entity';
import { generateUUID } from '@shared/infrastructure/helpers/id.helper';

export class UserFactory {
    static create(dto: ICreateUserDto): User {
        return new User({
            ...dto,
            id: generateUUID(),
            created_at: new Date(),
            updated_at: new Date()
        });
    }
}