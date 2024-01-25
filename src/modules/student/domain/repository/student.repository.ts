import { Repository } from '@shared/domain/repositories/base.repository';
import { Student } from '@student/domain/entity/student.entity';
import { User } from '@user/domain/entity/user.entity';

export interface IStudentRepository extends Repository<Student> {
    findOneByUserId(user_id: string): Promise<Student | null>;
    findOneByUserDni(user_dni: string): Promise<Student | null>;
    findAllByUserParam(param: keyof User, value: unknown): Promise<Student[]>
}