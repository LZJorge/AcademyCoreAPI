import { findOneStudentById } from '@student/application/usecases/find-one-by-id';
import { studentRepositoryMock } from '@student/domain/repository/mocks/student.repository.mock';
import { managerMock } from '@shared/domain/repositories/mocks/transaction.manager.mock';
import { generateFakeStudent } from '@tests/utils/mocks/user.fake';
import { StudentNotFoundError } from '@student/domain/exceptions/student-not-found.exception';

describe('Find all students Usecase test', () => {
    const student = generateFakeStudent();

    it('should find one student by id and return success response', async () => {
        managerMock.commit.mockResolvedValueOnce([student]);

        // Call function
        const response = await findOneStudentById(student.id, studentRepositoryMock, managerMock);

        // Assertions
        expect(managerMock.commit).toHaveBeenCalled();
        expect(response.isSuccess).toBeTruthy();
        if(!response.isSuccess) return;
        expect(response.value).toMatchObject(student);
    });

    it('should not find one student if id does not exist and return failure response', async () => {
        managerMock.commit.mockResolvedValueOnce([null]);

        // Call function
        const response = await findOneStudentById('unknown id', studentRepositoryMock, managerMock);

        // Assertions
        expect(managerMock.commit).toHaveBeenCalled();
        expect(response.isSuccess).toBeFalsy();
        if(response.isSuccess) return;
        expect(response.error).toBeInstanceOf(StudentNotFoundError);
    });
});