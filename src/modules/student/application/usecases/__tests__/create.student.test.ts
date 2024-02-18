import { generateFakeStudent, generateFakeUser } from '@tests/utils/mocks/user.fake';
import { createStudent } from '@student/application/usecases/create-student';
import { ICreateUserDto } from '@user/application/dto/create-user.dto';

import { userRepositoryMock } from '@user/domain/repository/mocks/user.repository.mock';
import { studentRepositoryMock } from '@student/domain/repository/mocks/student.repository.mock';
import { managerMock } from '@shared/domain/repositories/mocks/transaction.manager.mock';

describe('Create student Usecase test', () => {
    const student = generateFakeStudent();
    student.user = generateFakeUser();
    student.user_id = student.user.id;
    const user = student.user;

    it('should create a new student and new user:', async () => {
        managerMock.commit.mockResolvedValueOnce([user, student]);

        const response = await createStudent(user as ICreateUserDto, {
            user: userRepositoryMock, student: studentRepositoryMock 
        }, managerMock);

        // Assertions  
        expect(managerMock.commit).toHaveBeenCalled();
        expect(response.isSuccess).toBeTruthy();
    });

    it('should create a new student with existent user:', async () => {
        managerMock.commit.mockResolvedValueOnce([user]);

        const response = await createStudent(user as ICreateUserDto, {
            user: userRepositoryMock, student: studentRepositoryMock 
        }, managerMock);

        // Assertions  
        expect(managerMock.commit).toHaveBeenCalled();
        expect(response.isSuccess).toBeTruthy();
    });
});