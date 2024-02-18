import { Entity } from '@shared/domain/entities/base.entity';
import { Transaction } from '@shared/domain/repositories/transaction';

/**
 * A Transaction Manager would be a class to handle all Transaction instances with the commit method
 * 
 * A manager need to implement an atomicity function provided by the used DB package
 * 
 * All the repositories should return an unresolved promise that you need to handle with the transaction manager
 * This allows you to group several transactions into one unit of work, so if any error occurs during this unit of work, all the transactions will fail
 */
export interface ITransactionManager {
    commit<T extends Entity | Entity[]>(transactions: Transaction): Promise<T[]>;
}