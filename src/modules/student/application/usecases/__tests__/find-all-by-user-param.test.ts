import { studentRepositoryMock } from '@student/domain/repository/mocks/student.repository.mock';
import { managerMock } from '@shared/domain/repositories/mocks/transaction.manager.mock';
import { findManyStudentsByUserParam } from '@student/application/usecases/find-all-by-user-param';

describe('Find all students Usecase test', () => {

    it('should find all students:', async () => {
        managerMock.commit.mockResolvedValueOnce([]);

        // Call function
        const response = await findManyStudentsByUserParam({ param: 'dni', value: '12345678' }, studentRepositoryMock, managerMock);

        // Assertions
        expect(managerMock.commit).toHaveBeenCalled();
        expect(response.isSuccess).toBeTruthy();
    });
});