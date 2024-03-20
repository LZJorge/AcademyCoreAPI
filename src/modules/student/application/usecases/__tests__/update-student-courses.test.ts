import { mockReset } from 'jest-mock-extended';
import { managerMock } from '@shared/domain/repositories/mocks/transaction.manager.mock';
import { studentRepositoryMock } from '@student/domain/repository/mocks/student.repository.mock';
import { generateFakeStudent } from '@tests/utils/mocks/user.fake';
import { StudentNotFoundError } from '@student/domain/exceptions/student.exceptions';
import { findAndUpdateStudentCoursesCompleted } from '@student/application/usecases/update-student-courses';
import { IUpdateStudentCoursesCompletedDto } from '@student/application/dto/update-student-courses_completed.dto';

describe('Update student courses usecase', () => {
    const student = generateFakeStudent();
    let newData: IUpdateStudentCoursesCompletedDto;

    beforeEach(() => {
        newData = generateFakeStudent();

        mockReset(managerMock);
        mockReset(studentRepositoryMock);
    });

    it('should find one student by id and sum the courses completed', async () => {
        managerMock.commit.mockResolvedValueOnce([student]);

        // Call function
        const response = await findAndUpdateStudentCoursesCompleted({ id: student.id, dto: { courses_completed: newData.courses_completed } }, studentRepositoryMock, managerMock);

        // Assertions
        if(!response.isSuccess) {return;}

        expect(managerMock.commit).toHaveBeenCalled();
        expect(studentRepositoryMock.findOne).toHaveBeenCalledWith(student.id);
        expect(studentRepositoryMock.update).toHaveBeenCalledWith({ ...student, courses_completed: student.courses_completed + newData.courses_completed });
        
        expect(response.isSuccess).toBeTruthy();
        expect(response.value).toBeDefined();
        expect(response.value).toMatchObject({ ...student, courses_completed: student.courses_completed + newData.courses_completed });
    });

    it('should return an error if student not found', async () => {
        managerMock.commit.mockResolvedValueOnce([null]);

        // Call function
        const response = await findAndUpdateStudentCoursesCompleted({ id: student.id, dto: { courses_completed: newData.courses_completed } }, studentRepositoryMock, managerMock);

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