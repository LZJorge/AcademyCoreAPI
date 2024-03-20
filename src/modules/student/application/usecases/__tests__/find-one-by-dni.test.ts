import { mockReset } from 'jest-mock-extended';
import { findOneStudentByUserDni } from '@student/application/usecases/find-one-by-dni';
import { studentRepositoryMock } from '@student/domain/repository/mocks/student.repository.mock';
import { managerMock } from '@shared/domain/repositories/mocks/transaction.manager.mock';
import { generateFakeStudent } from '@tests/utils/mocks/user.fake';
import { StudentNotFoundError } from '@student/domain/exceptions/student.exceptions';

describe('Find all students Usecase test', () => {
    const student = generateFakeStudent();

    beforeEach(() => {
        mockReset(managerMock);
        mockReset(studentRepositoryMock);
    });

    it('should find one student by dni and return success response', async () => {
        managerMock.commit.mockResolvedValueOnce([student]);

        // Call function
        const response = await findOneStudentByUserDni(student.user.dni, studentRepositoryMock, managerMock);

        // Assertions
        if(!response.isSuccess) {return;}

        expect(managerMock.commit).toHaveBeenCalled();
        expect(studentRepositoryMock.findOneByUserDni).toHaveBeenCalledWith(student.user.dni);

        expect(response.isSuccess).toBeTruthy();
        expect(response.value).toBeDefined();
        expect(response.value).toMatchObject(student);
    });

    it('should not find one student if dni does not exist and return failure response', async () => {
        managerMock.commit.mockResolvedValueOnce([null]);

        // Call function
        const response = await findOneStudentByUserDni('unknown dni', studentRepositoryMock, managerMock);

        // Assertions
        if(response.isSuccess) {return;}

        expect(managerMock.commit).toHaveBeenCalled();
        expect(studentRepositoryMock.findOneByUserDni).toHaveBeenCalledWith('unknown dni');

        expect(response.isSuccess).toBeFalsy();
        expect(response.error).toBeInstanceOf(StudentNotFoundError);
    });
});