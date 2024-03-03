import { findOneStudentByUserDni } from '@student/application/usecases/find-one-by-dni';
import { studentRepositoryMock } from '@student/domain/repository/mocks/student.repository.mock';
import { managerMock } from '@shared/domain/repositories/mocks/transaction.manager.mock';
import { generateFakeStudent } from '@tests/utils/mocks/user.fake';
import { StudentNotFoundError } from '@student/domain/exceptions/student.exceptions';

describe('Find all students Usecase test', () => {
    const student = generateFakeStudent();

    it('should find one student by dni and return success response', async () => {
        managerMock.commit.mockResolvedValueOnce([student]);

        // Call function
        const response = await findOneStudentByUserDni(student.user.dni, studentRepositoryMock, managerMock);

        // Assertions
        expect(managerMock.commit).toHaveBeenCalled();
        expect(response.isSuccess).toBeTruthy();
        if(!response.isSuccess) {return;}
        expect(response.value).toMatchObject(student);
    });

    it('should not find one student if dni does not exist and return failure response', async () => {
        managerMock.commit.mockResolvedValueOnce([null]);

        // Call function
        const response = await findOneStudentByUserDni('unknown dni', studentRepositoryMock, managerMock);

        // Assertions
        expect(managerMock.commit).toHaveBeenCalled();
        expect(response.isSuccess).toBeFalsy();
        if(response.isSuccess) {return;}
        expect(response.error).toBeInstanceOf(StudentNotFoundError);
    });
});