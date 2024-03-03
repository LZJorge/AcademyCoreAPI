import { generateFakeStudent } from '@tests/utils/mocks/user.fake';
import { createStudent } from '@student/application/usecases/create-student';
import { ICreateUserDto } from '@user/application/dto/create-user.dto';
import { StudentAlreadyRegisteredError } from '@student/domain/exceptions/student.exceptions';
import { userRepositoryMock } from '@user/domain/repository/mocks/user.repository.mock';
import { studentRepositoryMock } from '@student/domain/repository/mocks/student.repository.mock';
import { managerMock } from '@shared/domain/repositories/mocks/transaction.manager.mock';

describe('Create student Usecase test', () => {
    const student = generateFakeStudent();
    const user = student.user;
    const dto: ICreateUserDto = {
        dni: student.user.dni,
        firstname: student.user.firstname,
        lastname: student.user.lastname,
        birthdate: student.user.birthdate,
        phone: student.user.phone,
        email: student.user.email
    };

    it('should create a new student and new user:', async () => {
        managerMock.commit.mockResolvedValueOnce([null]);

        const response = await createStudent(dto, {
            user: userRepositoryMock, student: studentRepositoryMock 
        }, managerMock);

        // Assertions  
        expect(managerMock.commit).toHaveBeenCalled();
        expect(response.isSuccess).toBeTruthy();
        if(!response.isSuccess) {return;}
        expect(response.value).toBeDefined();
        expect(response.value?.user).toMatchObject(dto);
    });

    it('should create a new student with existent user:', async () => {
        managerMock.commit.mockResolvedValueOnce([user]);
        managerMock.commit.mockResolvedValueOnce([null]);

        // Execution
        const response = await createStudent(dto, {
            user: userRepositoryMock, student: studentRepositoryMock 
        }, managerMock);

        // Assertions
        if(!response.isSuccess) {return;}

        expect(managerMock.commit).toHaveBeenCalled();
        expect(response.isSuccess).toBeTruthy();
        expect(response.value).toBeDefined();
        expect(response.value?.user).toMatchObject(dto);
    });

    it('should not create a new student if student already exists', async () => {
        managerMock.commit.mockResolvedValueOnce([user]);
        managerMock.commit.mockResolvedValueOnce([student]);

        // Execution
        const response = await createStudent(dto, {
            user: userRepositoryMock, student: studentRepositoryMock 
        }, managerMock);

        // Assertions
        if(response.isSuccess) {return;}

        expect(managerMock.commit).toHaveBeenCalled();
        expect(response.isSuccess).toBeFalsy();
        expect(response.error).toBeDefined();
        expect(response.error).toBeInstanceOf(StudentAlreadyRegisteredError);
    });
});