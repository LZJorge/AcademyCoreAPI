import { mock } from 'jest-mock-extended';
import { ITransactionManager } from '@shared/domain/repositories/transaction.manager';

/**
 * We need a mock manager for test the usecases
 * 
 * Putting it makes it easier to import, also when I put it into the `test` folder don't worked when I try to import it, and don't know why :/
 */
export const managerMock = mock<ITransactionManager>();