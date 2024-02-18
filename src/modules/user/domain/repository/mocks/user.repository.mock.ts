import { mock } from 'jest-mock-extended';
import { IUserRepository } from '@user/domain/repository/user.repository';

/**
 * We need a mock repository for test the usecases
 * 
 * Putting it makes it easier to import, also when I put it into the `test` folder don't worked when I try to import it, and don't know why :/
 */
export const userRepositoryMock = mock<IUserRepository>();