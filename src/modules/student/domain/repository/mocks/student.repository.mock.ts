import { mock } from 'jest-mock-extended';
import { IStudentRepository } from '@student/domain/repository/student.repository';

/**
 * We need a mock repository for test the usecases
 * 
 * Putting it makes it easier to import, also when I put it into the `test` folder don't worked when I try to import it, and don't know why :/
 */
export const studentRepositoryMock = mock<IStudentRepository>();