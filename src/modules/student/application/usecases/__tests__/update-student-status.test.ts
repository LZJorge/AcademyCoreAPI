import { mockReset } from 'jest-mock-extended';
import { managerMock } from '@shared/domain/repositories/mocks/transaction.manager.mock';
import { studentRepositoryMock } from '@student/domain/repository/mocks/student.repository.mock';
import { generateFakeStudent } from '@tests/utils/mocks/user.fake';
import { StudentNotFoundError } from '@student/domain/exceptions/student.exceptions';
import { findAndUpdateStudentStatus } from '@student/application/usecases/update-student-status';

describe('Update student status usecase', () => {
    const student = generateFakeStudent();

    beforeEach(() => {
        mockReset(managerMock);
        mockReset(studentRepositoryMock);
    });

    it('should find one student by id and update his status to true', async () => {
        managerMock.commit.mockResolvedValueOnce([student]);

        // Call function
        const response = await findAndUpdateStudentStatus({ id: student.id, dto: { is_active: true } }, studentRepositoryMock, managerMock);

        // Assertions
        if(!response.isSuccess) {return;}

        expect(managerMock.commit).toHaveBeenCalled();
        expect(studentRepositoryMock.findOne).toHaveBeenCalledWith(student.id);
        expect(studentRepositoryMock.update).toHaveBeenCalledWith({ ...student, is_active: true });

        expect(response.isSuccess).toBeTruthy();
        expect(response.value).toBeDefined();
        expect(response.value).toMatchObject({ ...student, is_active: true });
    });

    it('should find one student by id and update his status to false', async () => {
        managerMock.commit.mockResolvedValueOnce([student]);

        // Call function
        const response = await findAndUpdateStudentStatus({ id: student.id, dto: { is_active: false } }, studentRepositoryMock, managerMock);

        // Assertions
        if(!response.isSuccess) {return;}

        expect(managerMock.commit).toHaveBeenCalled();
        expect(studentRepositoryMock.findOne).toHaveBeenCalledWith(student.id);
        expect(studentRepositoryMock.update).toHaveBeenCalledWith({ ...student, is_active: false });

        expect(response.isSuccess).toBeTruthy();
        expect(response.value).toBeDefined();
        expect(response.value).toMatchObject({ ...student, is_active: false });
    });

    it('should return an error if student not found', async () => {
        managerMock.commit.mockResolvedValueOnce([null]);

        // Call function
        const response = await findAndUpdateStudentStatus({ id: student.id, dto: { is_active: true } }, studentRepositoryMock, managerMock);

        // Assertions
        if(response.isSuccess) {return;}

        expect(managerMock.commit).toHaveBeenCalled();
        expect(studentRepositoryMock.findOne).toHaveBeenCalledWith(student.id);
        expect(studentRepositoryMock.update).not.toHaveBeenCalled();

        expect(response.isSuccess).toBeFalsy();
        expect(response.error).toBeDefined();
        expect(response.error).toBeInstanceOf(StudentNotFoundError);
    });
});