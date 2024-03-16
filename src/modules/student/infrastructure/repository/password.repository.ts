import { PrismaClient } from '@prisma/client';
import { NotUsableMethodException } from '@shared/domain/exceptions/notUsableMethod.exception';
import { StudentPassword } from '@student/domain/entity/password.entity';
import { IStudentPasswordRepository } from '@student/domain/repository/password.repository';

export class StudentPasswordRepository implements IStudentPasswordRepository {
    constructor(private readonly client: PrismaClient) {}

    async create(data: StudentPassword): Promise<StudentPassword | null> {
        return this.client.student_password.create({
            data
        });
    }

    async findOne(id: string): Promise<StudentPassword | null> {
        return this.client.student_password.findUnique({
            where: { id }
        });
    }

    async findOneByStudentId(student_id: string): Promise<StudentPassword | null> {
        return this.client.student_password.findUnique({
            where: { student_id }
        });
    }

    async update(data: StudentPassword): Promise<StudentPassword | null> {
        return this.client.student_password.update({
            where: { id: data.id },
            data: {
                value: data.value
            }
        });
    }

    /**
     * Not Available
     */
    async findAll(): Promise<StudentPassword[]> {
        throw new NotUsableMethodException('StudentPassword', 'findAll');
    }

    async findAllBy(param: keyof StudentPassword, value: unknown): Promise<StudentPassword[]> {
        throw new NotUsableMethodException('StudentPassword', 'findAllBy');
    }

    async delete(id: string): Promise<{ success: boolean; }> {
        throw new NotUsableMethodException('StudentPassword', 'delete');
    }
}