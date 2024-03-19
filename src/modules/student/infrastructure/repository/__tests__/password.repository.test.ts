import { NotUsableMethodException } from '@shared/domain/exceptions/notUsableMethod.exception';
import { StudentPassword } from '@student/domain/entity/password.entity';
import { StudentPasswordRepository } from '@student/infrastructure/repository/password.repository';
import { prismaMock } from '@tests/lib/mocks/prisma.mock';
import { generateFakeID, generateFakePassword } from '@tests/utils/mocks/user.fake';

describe('Student Repository Tests', () => {
    const client = prismaMock;
    let repository: StudentPasswordRepository,
        studentPassword: StudentPassword;  
   
    beforeEach(() => {
        repository = new StudentPasswordRepository(client);
        studentPassword = new StudentPassword({
            id: generateFakeID(),
            value: generateFakePassword(),
            student_id: generateFakeID()
        });
    });

    /**
     * @method Create
     */
    describe('Create student password', () => {
        it('should create student password:', async () => {
            client.student_password.create.mockResolvedValueOnce(studentPassword);

            const result = await repository.create(studentPassword);

            expect(result).toBeDefined();
            expect(result).toBe(studentPassword);
            expect(client.student_password.create).toHaveBeenCalledWith({
                data: {
                    id: studentPassword.id,
                    value: studentPassword.value,
                    student_id: studentPassword.student_id
                }
            });
        });
    });

    /**
     * @method Read
     */
    describe('Find student password', () => {
        it('should find student password by id:', async () => {
            client.student_password.findUnique.mockResolvedValueOnce(studentPassword);
            const result = await repository.findOne(studentPassword.id);
            expect(result).toBeDefined();
            expect(result).toBe(studentPassword);
            expect(client.student_password.findUnique).toHaveBeenCalledWith({
                where: { id: studentPassword.id }
            });
        });

        it('should find student password by student_id:', async () => {
            client.student_password.findUnique.mockResolvedValueOnce(studentPassword);
            const result = await repository.findOneByStudentId(studentPassword.student_id);
            expect(result).toBeDefined();
            expect(result).toBe(studentPassword);
            expect(client.student_password.findUnique).toHaveBeenCalledWith({
                where: { student_id: studentPassword.student_id }
            });
        });
    });

    /**
     * @method Update
     */
    describe('Update student password', () => {
        it('should update student password:', async () => {
            client.student_password.update.mockResolvedValueOnce(studentPassword);
            const result = await repository.update(studentPassword);
            expect(result).toBeDefined();
            expect(result).toBe(studentPassword);
            expect(client.student_password.update).toHaveBeenCalledWith({
                where: { id: studentPassword.id },
                data: {
                    value: studentPassword.value
                }
            });
        });
    });

    /**
     * Methods that cant be implemented
     */
    describe('Unimplemented methods', () => {
        describe('Find all passwords', () => {
            it('should return not usable method error', async () => {
                let error;

                try {
                    await repository.findAll();
                } catch (e) {
                    error = e;
                }
                
                expect(error).toBeDefined();
                expect(error).toBeInstanceOf(NotUsableMethodException);
            });
        });

        describe('Find all passwords by', () => {
            it('should return not usable method error', async () => {
                let error;

                try {
                    await repository.findAllBy(/* 'id', studentPassword.id */);
                } catch (e) {
                    error = e;
                }
    
                expect(error).toBeDefined();
                expect(error).toBeInstanceOf(NotUsableMethodException);
            });
        });

        describe('Delete password', () => {
            it('should return not usable method error', async () => {
                let error;
    
                try {
                    await repository.delete(/* studentPassword.id */);
                } catch (e) {
                    error = e;
                }
    
                expect(error).toBeDefined();
                expect(error).toBeInstanceOf(NotUsableMethodException);
            });
        });
    });
});