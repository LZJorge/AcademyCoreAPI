import { mock } from 'jest-mock-extended';
import { IStudentPasswordRepository } from '@student/domain/repository/password.repository';

/**
 * We need a mock repository for test the usecases
 * 
 * Putting it makes it easier to import, also when I put it into the `test` folder don't worked when I try to import it, and don't know why :/
 */
export const studentPasswordRepositoryMock = mock<IStudentPasswordRepository>();