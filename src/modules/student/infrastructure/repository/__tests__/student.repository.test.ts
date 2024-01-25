import { Student } from '@student/domain/entity/student.entity';
import { StudentRepository } from '@student/infrastructure/repository/student.repository';
import { prismaMock } from '@tests/lib/mocks/prisma.mock';
import { generateFakeStudent } from '@tests/utils/mocks/user.fake';

describe('Student Repository Tests', () => {
    const client = prismaMock;
    let repository: StudentRepository,
        student: Student;  
   
    beforeEach(() => {
        repository = new StudentRepository(client);
        student = generateFakeStudent();
    });

    /**
     * @method Create
     */
    describe('Create student', () => {
        it('should create student:', async () => {
            client.student.create.mockResolvedValue(student);
            const result = await repository.create(student);
            expect(result).toBeDefined();
            expect(result).toBe(student);
            expect(client.student.create).toHaveBeenCalledWith({
                data: {
                    id: student.id,
                    is_active: student.is_active,
                    courses_completed: student.courses_completed,
                    user_id: student.user_id
                }
            })
        });
    });

    /**
     * @method Read
     */
    describe('Read Users', () => {
        it('should find student by id:', async () => {
            client.student.findUnique.mockResolvedValue(student);
            const result = await repository.findOne(student.id);
            expect(result).toBeDefined();
            expect(result).toBe(student);
            expect(client.student.findUnique).toHaveBeenCalledWith({
                where: { id: student.id },
                include: { user: true }
            })
        });

        it('should find student by user_id:', async () => {
            client.student.findUnique.mockResolvedValue(student);
            const result = await repository.findOneByUserId(student.user_id);
            expect(result).toBeDefined();
            expect(result).toBe(student);
            expect(client.student.findUnique).toHaveBeenCalledWith({
                where: { user_id: student.user_id },
                include: { user: true }
            })
        });

        it('should find student by user dni:', async () => {
            client.student.findFirst.mockResolvedValue(student);
            if(!student.user) {
                throw new Error('Undefined User')
            }

            const result = await repository.findOneByUserDni(student.user.dni);
            expect(result).toBeDefined();
            expect(result).toBe(student);
            expect(client.student.findFirst).toHaveBeenCalledWith({
                where: { user: { dni: student.user.dni } },
                include: { user: true }
            })
        });

        it('should find all students:', async () => {
            client.student.findMany.mockResolvedValue([student]);
            const result = await repository.findAll();
            expect(result).toBeDefined();
            expect(result).toContain(student);
            expect(client.student.findMany).toHaveBeenCalledWith({
                include: { user: true }
            });
        });

        it('should find all students by some param:', async () => {
            client.student.findMany.mockResolvedValue([student]);
            const result = await repository.findAllBy('courses_completed', student.courses_completed);
            expect(result).toBeDefined();
            expect(result).toContain(student);
            expect(client.student.findMany).toHaveBeenCalledWith({
                where: { courses_completed: student.courses_completed },
                include: { user: true }
            });
        });

        it('should find all students by some user param:', async () => {
            client.student.findMany.mockResolvedValue([student]);
            if(!student.user) {
                throw new Error('Undefined User')
            }
            let result = await repository.findAllByUserParam('email', student.user.email);
            expect(result).toBeDefined();
            expect(result).toContain(student);
            expect(client.student.findMany).toHaveBeenCalledWith({
                where: { user: { email: student.user.email } },
                include: { user: true }
            });

            result = await repository.findAllByUserParam('phone', student.user.phone);
            expect(result).toBeDefined();
            expect(result).toContain(student);
            expect(client.student.findMany).toHaveBeenCalledWith({
                where: { user: { phone: student.user.phone } },
                include: { user: true }
            });
        });
    });

    /**
     * @method Update
     */
    describe('Update Student', () => {
        const newData = generateFakeStudent();

        it('should return updated student:', async () => {
            let updated = { ...student, courses_completed: newData.courses_completed, is_active: newData.is_active };
            client.student.update.mockResolvedValueOnce(updated);
            let result = await repository.update(updated);
            expect(result).toBeDefined();
            expect(result).toMatchObject(updated);
            expect(client.student.update).toHaveBeenCalledWith({
                where: { id: updated.id },
                data: {
                    is_active: updated.is_active,
                    courses_completed: updated.courses_completed
                },
                include: { user: true }
            })
        });
    });

    /**
     * @method Delete
     */
    describe('Delete student', () => {
        it('should delete user:', async () => {
            client.student.findUnique.mockResolvedValue(null);
            const result = await repository.delete(student.id);
            expect(result).toBeDefined();
            expect(result).toMatchObject({ success: true });
            expect(client.student.delete).toHaveBeenCalledWith({
                where: { id: student.id }
            });
            expect(client.student.findUnique).toHaveBeenCalledWith({ where: { id: student.id }})
        });
    });
});