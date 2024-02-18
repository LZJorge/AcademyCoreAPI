import { findManyStudents } from '@student/application/usecases/find-all';
import { studentRepositoryMock } from '@student/domain/repository/mocks/student.repository.mock';
import { managerMock } from '@shared/domain/repositories/mocks/transaction.manager.mock';

describe('Find all students Usecase test', () => {

    it('should find all students:', async () => {
        managerMock.commit.mockResolvedValueOnce([]);

        // Call function
        const response = await findManyStudents(studentRepositoryMock, managerMock);

        // Assertions
        expect(managerMock.commit).toHaveBeenCalled();
        expect(response.isSuccess).toBeTruthy();
    });
});