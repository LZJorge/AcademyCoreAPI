import { PrismaClient } from '@prisma/client';
import { Student } from '@student/domain/entity/student.entity';
import { IStudentRepository } from '@student/domain/repository/student.repository';
import { User } from '@user/domain/entity/user.entity';

export class StudentRepository implements IStudentRepository {
    constructor(private readonly client: PrismaClient) {}
    
    async create(data: Student): Promise<Student | null> {
        return await this.client.student.create({
            data: {
                id: data.id,
                is_active: data.is_active,
                courses_completed: data.courses_completed,
                user_id: data.user_id
            }
        });
    }
    
    async findOne(id: string): Promise<Student | null> {
        return await this.client.student.findUnique({
            where: { id },
            include: { user: true }
        });
    }

    async findOneByUserId(user_id: string): Promise<Student | null> {
        return await this.client.student.findUnique({
            where: { user_id },
            include: { user: true }
        });
    }
    
    async findOneByUserDni(user_dni: string): Promise<Student | null> {
        return await this.client.student.findFirst({
            where: { user: {
                dni: user_dni
            } },
            include: { user: true }
        });
    }
    
    async findAll(): Promise<Student[]> {
        return await this.client.student.findMany({
            include: { user: true }
        });
    }
    
    async findAllBy(param: keyof Student, value: unknown): Promise<Student[]> {
        return await this.client.student.findMany({
            where: { [param]: value },
            include: { user: true }
        });
    }
    
    async findAllByUserParam(param: keyof User, value: unknown): Promise<Student[]> {
        return await this.client.student.findMany({
            where: { user: { [param]: value } },
            include: { user: true }
        });
    }
    
    async update(data: Partial<Student>): Promise<Student | null> {
        return await this.client.student.update({
            where: { id: data.id },
            data: {
                is_active: data.is_active,
                courses_completed: data.courses_completed
            },
            include: { user: true }
        });
    }
    
    async delete(id: string): Promise<{ success: boolean; }> {
        await this.client.student.delete({
            where: { id }
        });

        if(!await this.client.student.findUnique({ where: { id }})) {
            return { success: true };
        }
        
        return { success: false };
    }
}