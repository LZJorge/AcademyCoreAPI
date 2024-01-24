import { PrismaClient } from '@prisma/client';
import { User } from '@user/domain/entity/user.entity';
import { IUserRepository } from '@user/domain/repository/user.repository';

export class UserRepository implements IUserRepository {
    constructor(private readonly client: PrismaClient) {}

    async create(data: User): Promise<User | null> {
        return await this.client.user.create({ data });
    }

    async findOne(id: string): Promise<User | null> {
        return await this.client.user.findUnique({ where: { id } });
    }

    async findByDni(dni: string): Promise<User | null> {
        return await this.client.user.findUnique({ where: { dni } });
    }

    async findAll(): Promise<User[]> {
        return await this.client.user.findMany();
    }

    async findAllBy(param: keyof User, value: unknown): Promise<User[]> {
        return await this.client.user.findMany({
            where: { [param]: value }
        });
    }

    async update(data: Partial<User>): Promise<User | null> {
        return await this.client.user.update({
            where: { id: data.id },
            data: {
                firstname: data.firstname,
                lastname: data.lastname,
                email: data.email,
                phone: data.phone,
                birthdate: data.birthdate,
                updated_at: data.updated_at,
            }
        });
    }

    async updateDni(data: User): Promise<User | null> {
        return await this.client.user.update({
            where: { id: data.id },
            data: {
                dni: data.dni,
                updated_at: data.updated_at
            }
        });
    }

    async delete(id: string): Promise<{ success: boolean; }> {
        await this.client.user.delete({
            where: { id }
        });

        if(!await this.client.user.findUnique({ where: { id }})) {
            return { success: true };
        }
        
        return { success: false };
    }  
}