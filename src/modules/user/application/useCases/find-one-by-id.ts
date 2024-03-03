import { IUserRepository } from '@user/domain/repository/user.repository';
import { UserNotFoundError } from '@user/domain/exceptions/user.exceptions';
import { FindOneUserResponse } from '@user/application/responses/find-one-user';
import { ITransactionManager } from '@shared/domain/repositories/transaction.manager';
import { Transaction } from '@shared/domain/repositories/transaction';
import { User } from '@user/domain/entity/user.entity';

/**
 * Find one user by id.
 *
 * @param {string} id - The id of the user to find
 * @param {IUserRepository} repository - The user repository
 * @param {ITransactionManager} manager - The transaction manager
 * @return {Promise<FindOneUserResponse>} The result of finding one user by id
 */
export async function findOneUserById(id: string, repository: IUserRepository, manager: ITransactionManager): Promise<FindOneUserResponse> {
    // Main transaction object
    const transaction = new Transaction();

    transaction.add(repository.findOne(id));
    
    // Commit changes
    const [user] = await manager.commit<User>(transaction);
    
    // Check if user exists
    if(!user) {
        return { isSuccess: false, error: new UserNotFoundError('id', id) };
    }

    return { isSuccess: true, value: user };
}