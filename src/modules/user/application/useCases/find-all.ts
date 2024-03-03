import { IUserRepository } from '@user/domain/repository/user.repository';
import { FindManyUserResponse } from '@user/application/responses/find-many-user';
import { ITransactionManager } from '@shared/domain/repositories/transaction.manager';
import { User } from '@user/domain/entity/user.entity';
import { Transaction } from '@shared/domain/repositories/transaction';

/**
 * Finds all users using the given user repository and transaction manager.
 *
 * @param {IUserRepository} repository - The user repository to use for finding all users.
 * @param {ITransactionManager} manager - The transaction manager to use for committing the transaction.
 * @return {Promise<FindManyUserResponse>} A promise that resolves with the response containing the found users.
 */
export async function findAllUser(repository: IUserRepository, manager: ITransactionManager): Promise<FindManyUserResponse> {
    const transaction = new Transaction();

    // Find all users
    transaction.add(repository.findAll());

    // Commit changes
    const [users] = await manager.commit<User[]>(transaction);
    
    return { isSuccess: true, value: users ? users : [] };
}