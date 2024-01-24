import { prismaMock } from '@tests/lib/mocks/prisma.mock';
import { generateFakeUser, generateManyFakeUser } from '@tests/utils/mocks/user.fake';
import { UserRepository } from '@user/infrastructure/repository/user.repository';
import { User } from '@user/domain/entity/user.entity';

describe('User Repository Tests', () => {
    const client = prismaMock;
    let repository: UserRepository,
        user: User;

    beforeEach(() => {
        repository = new UserRepository(client);
        user = generateFakeUser();
    });

    /**
     * @method Create
     */
    describe('Create User', () => {
        it('should create user:', async () => {
            client.user.create.mockResolvedValue(user);     
            const result = await repository.create(user);
            expect(result).toBeDefined();
            expect(result).toBe(user);
            expect(client.user.create).toHaveBeenCalledWith({
                data: user
            });
        });
    });

    /**
     * @method Read
     */
    describe('Read Users', function() {
        it('should find user by his id:', async () => {
            client.user.findUnique.mockResolvedValue(user);     
            const result = await repository.findOne(user.id);
            expect(result).toBeDefined();
            expect(result).toBe(user);
            expect(client.user.findUnique).toHaveBeenCalledWith({
                where: { id: user.id }
            });
        });

        it('should find user by his dni:', async () => {
            client.user.findUnique.mockResolvedValue(user);     
            const result = await repository.findByDni(user.dni);
            expect(result).toBeDefined();
            expect(result).toBe(user);
            expect(client.user.findUnique).toHaveBeenCalledWith({
                where: { dni: user.dni }
            });
        });

        it('should find all user:', async () => {
            const users: Array<User> = generateManyFakeUser(10);
            client.user.findMany.mockResolvedValue(users);     
            const result = await repository.findAll();
            expect(result).toBeDefined();
            expect(result).toBe(users);
            expect(client.user.findMany).toHaveBeenCalled();
        });

        it('should find all user by some param:', async () => {
            client.user.findMany.mockResolvedValue([user]);     
            let result = await repository.findAllBy('firstname', user.firstname);
            expect(result).toBeDefined();
            expect(result).toContain(user);
            expect(client.user.findMany).toHaveBeenCalledWith({
                where: { firstname: user.firstname }
            });

            result = await repository.findAllBy('lastname', user.lastname);
            expect(result).toBeDefined();
            expect(result).toContain(user);
            expect(client.user.findMany).toHaveBeenCalledWith({
                where: { lastname: user.lastname }
            });

            result = await repository.findAllBy('phone', user.phone);
            expect(result).toBeDefined();
            expect(result).toContain(user);
            expect(client.user.findMany).toHaveBeenCalledWith({
                where: { phone: user.phone }
            });
        });
    });

    /**
     * @method Update
     */
    describe('Update User', () => {
        const newData = generateFakeUser();

        it('should return updated user:', async () => {
            let updated = { ...user, firstname: newData.firstname };
            client.user.update.mockResolvedValueOnce(updated);
            let result = await repository.update(updated);
            expect(result).toBeDefined();
            expect(result).toMatchObject(updated);

            updated = { 
                ...user, 
                lastname: newData.lastname,
                email: newData.email
            };
            
            client.user.update.mockResolvedValueOnce(updated);
            result = await repository.update(updated);
            expect(result).toBeDefined();
            expect(result).toMatchObject(updated);
            expect(client.user.update).toHaveBeenCalledWith({
                where: { id: updated.id },
                data: {
                    firstname: updated.firstname,
                    lastname: updated.lastname,
                    email: updated.email,
                    phone: updated.phone,
                    birthdate: updated.birthdate,
                    updated_at: updated.updated_at,
                }
            });
        });

        it('should return updated dni of some user:', async () => {
            const updated = { ...user, dni: newData.dni };
            client.user.update.mockResolvedValue(updated);
            const result = await repository.updateDni(updated);
            expect(result).toBeDefined();
            expect(result).toMatchObject(updated);
            expect(client.user.update).toHaveBeenCalledWith({
                where: { id: updated.id },
                data: {
                    dni: updated.dni,
                    updated_at: updated.updated_at
                }
            });
        });
    });

    /**
     * @method Delete
     */
    describe('Delete User', () => {
        it('should delete user:', async () => {
            client.user.findUnique.mockResolvedValue(null);
            const result = await repository.delete(user.id);
            expect(result).toBeDefined();
            expect(result).toMatchObject({ success: true });
            expect(client.user.delete).toHaveBeenCalledWith({
                where: { id: user.id }
            });
            expect(client.user.findUnique).toHaveBeenCalledWith({ where: { id: user.id }});
        });
    });
});