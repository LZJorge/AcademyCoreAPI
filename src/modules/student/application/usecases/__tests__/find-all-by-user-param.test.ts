import { mockReset } from 'jest-mock-extended';
import { generateManyFakeStudent } from '@tests/utils/mocks/user.fake';
import { managerMock } from '@shared/domain/repositories/mocks/transaction.manager.mock';
import { User } from '@user/domain/entity/user.entity';
import { CantSearchUserByInvalidParamError } from '@user/domain/exceptions/user.exceptions';
import { studentRepositoryMock } from '@student/domain/repository/mocks/student.repository.mock';
import { findManyStudentsByUserParam } from '@student/application/usecases/find-all-by-user-param';

describe('Find all students Usecase test', () => {
    const students = generateManyFakeStudent(10);

    beforeEach(() => {
        mockReset(managerMock);
        mockReset(studentRepositoryMock);
    });

    it('should find all students by param and return a success response:', async () => {
        managerMock.commit.mockResolvedValueOnce([students]);

        // Call function
        const response = await findManyStudentsByUserParam({ param: 'dni', value: '12345678' }, studentRepositoryMock, managerMock);

        // Assertions
        if(!response.isSuccess) {return;}

        expect(managerMock.commit).toHaveBeenCalled();
        expect(studentRepositoryMock.findAllByUserParam).toHaveBeenCalledWith('dni', '12345678');

        expect(response.isSuccess).toBeTruthy();
        expect(response.value).toHaveLength(10);
        expect(response.value).toEqual(students);
        expect(response.value).not.toBeNull();
        expect(response.value).toBeDefined();
    });

    it('should find all students by param and return an empty array if no students found:', async () => {
        managerMock.commit.mockResolvedValueOnce([ [] ]);

        // Call function
        const response = await findManyStudentsByUserParam({ param: 'dni', value: '12345678' }, studentRepositoryMock, managerMock);

        // Assertions
        if(!response.isSuccess) {return;}

        expect(managerMock.commit).toHaveBeenCalled();
        expect(studentRepositoryMock.findAllByUserParam).toHaveBeenCalledWith('dni', '12345678');

        expect(response.isSuccess).toBeTruthy();
        expect(response.value).toHaveLength(0);
        expect(response.value).toEqual([]);
        expect(response.value).not.toBeNull();
        expect(response.value).toBeDefined();
    });

    it('should return error if provided param is invalid', async () => {
        // Call function
        const response = await findManyStudentsByUserParam({ param: 'invalid param' as keyof User, value: '12345678' }, studentRepositoryMock, managerMock);

        // Assertions
        if(response.isSuccess) {return;}

        expect(managerMock.commit).not.toHaveBeenCalled();
        expect(studentRepositoryMock.findAllByUserParam).not.toHaveBeenCalled();

        expect(response.isSuccess).toBeFalsy();
        expect(response.error).not.toBeNull();
        expect(response.error).toBeDefined();
        expect(response.error).toBeInstanceOf(CantSearchUserByInvalidParamError);
    });
});