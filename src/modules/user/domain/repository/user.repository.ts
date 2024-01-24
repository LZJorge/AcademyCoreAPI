import { Repository } from '@shared/domain/repositories/base.repository';
import { User } from '@user/domain/entity/user.entity';
export interface IUserRepository extends Repository<User> {
    findByDni(dni: string): Promise<User | null>;
    updateDni(data: User): Promise<User | null>;
}