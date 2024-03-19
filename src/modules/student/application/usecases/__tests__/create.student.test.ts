import { generateFakePassword, generateFakeStudent } from '@tests/utils/mocks/user.fake';
import { createStudent } from '@student/application/usecases/create-student';
import { StudentAlreadyRegisteredError } from '@student/domain/exceptions/student.exceptions';
import { userRepositoryMock } from '@user/domain/repository/mocks/user.repository.mock';
import { studentRepositoryMock } from '@student/domain/repository/mocks/student.repository.mock';
import { managerMock } from '@shared/domain/repositories/mocks/transaction.manager.mock';
import { ICreateStudentDto } from '@student/application/dto/create-student.dto';
import { studentPasswordRepositoryMock } from '@student/domain/repository/mocks/password.repository.mock';
import { mockReset } from 'jest-mock-extended';

describe('Create student Usecase test', () => {
    const student = generateFakeStudent();
    const user = student.user;
    const dto: ICreateStudentDto = {
        student_password: generateFakePassword(),
        user: {
            dni: student.user.dni,
            firstname: student.user.firstname,
            lastname: student.user.lastname,
            birthdate: student.user.birthdate,
            phone: student.user.phone,
            email: student.user.email
        }
    };

    beforeEach(() => {
        mockReset(managerMock);
        mockReset(userRepositoryMock);
        mockReset(studentRepositoryMock);
        mockReset(studentPasswordRepositoryMock);
    })

    it('should create a new student and new user:', async () => {
        managerMock.commit.mockResolvedValueOnce([null]);

        const response = await createStudent(dto, {
            user: userRepositoryMock, student: studentRepositoryMock, student_password: studentPasswordRepositoryMock 
        }, managerMock);

        // Assertions  
        expect(managerMock.commit).toHaveBeenCalled();

        expect(userRepositoryMock.create).toHaveBeenCalled();
        expect(studentRepositoryMock.create).toHaveBeenCalled();
        expect(studentPasswordRepositoryMock.create).toHaveBeenCalled();

        expect(response.isSuccess).toBeTruthy();
        if(!response.isSuccess) {return;}
        expect(response.value).toBeDefined();
        expect(response.value).toMatchObject({ user: dto.user });
    });

    it('should create a new student with existent user:', async () => {
        managerMock.commit.mockResolvedValueOnce([user]);
        managerMock.commit.mockResolvedValueOnce([null]);

        // Execution
        const response = await createStudent(dto, {
            user: userRepositoryMock, student: studentRepositoryMock, student_password: studentPasswordRepositoryMock 
        }, managerMock);

        // Assertions
        if(!response.isSuccess) {return;}

        expect(managerMock.commit).toHaveBeenCalled();

        expect(userRepositoryMock.create).not.toHaveBeenCalled();
        expect(studentRepositoryMock.create).toHaveBeenCalled();
        expect(studentPasswordRepositoryMock.create).toHaveBeenCalled();

        expect(response.isSuccess).toBeTruthy();
        expect(response.value).toBeDefined();
        expect(response.value).toMatchObject({ user: dto.user });
    });

    it('should not create a new student if student already exists', async () => {
        managerMock.commit.mockResolvedValueOnce([user]);
        managerMock.commit.mockResolvedValueOnce([student]);

        // Execution
        const response = await createStudent(dto, {
            user: userRepositoryMock, student: studentRepositoryMock, student_password: studentPasswordRepositoryMock  
        }, managerMock);

        // Assertions
        if(response.isSuccess) {return;}

        expect(managerMock.commit).toHaveBeenCalled();

        expect(userRepositoryMock.findByDni).toHaveBeenCalled();
        expect(studentRepositoryMock.findOneByUserId).toHaveBeenCalled();
        expect(studentRepositoryMock.create).not.toHaveBeenCalled();
        expect(studentPasswordRepositoryMock.create).not.toHaveBeenCalled();

        expect(response.isSuccess).toBeFalsy();
        expect(response.error).toBeDefined();
        expect(response.error).toBeInstanceOf(StudentAlreadyRegisteredError);
    });
});