import { findManyStudents } from '@student/application/usecases/find-all';
import { studentRepositoryMock } from '@student/domain/repository/mocks/student.repository.mock';
import { managerMock } from '@shared/domain/repositories/mocks/transaction.manager.mock';
import { generateManyFakeStudent } from '@tests/utils/mocks/user.fake';

describe('Find all students Usecase test', () => {
    const students = generateManyFakeStudent(10);

    it('should find all students and return success response:', async () => {
        managerMock.commit.mockResolvedValueOnce([students]);

        // Call function
        const response = await findManyStudents(studentRepositoryMock, managerMock);

        // Assertions
        expect(managerMock.commit).toHaveBeenCalled();
        expect(response.isSuccess).toBeTruthy();
        if(!response.isSuccess) return;
        expect(response.value).toHaveLength(students.length);
        expect(response.value).toEqual(students);
        expect(response.value).not.toBeNull();
        expect(response.value).not.toBeUndefined();
    });

    it('should find all students and return an empty array if no students found', async () => {
        managerMock.commit.mockResolvedValueOnce([]);

        // Call function
        const response = await findManyStudents(studentRepositoryMock, managerMock);

        // Assertions
        expect(managerMock.commit).toHaveBeenCalled();
        expect(response.isSuccess).toBeTruthy();
        if(!response.isSuccess) return;
        expect(response.value).toHaveLength(0);
        expect(response.value).toEqual([]);
        expect(response.value).not.toBeNull();
        expect(response.value).not.toBeUndefined();
    });
});