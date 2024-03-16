import { Repository } from '@shared/domain/repositories/base.repository';
import { StudentPassword } from '@student/domain/entity/password.entity';

export interface IStudentPasswordRepository extends Repository<StudentPassword> {
    findOneByStudentId(studentId: string): Promise<StudentPassword | null>;
}
