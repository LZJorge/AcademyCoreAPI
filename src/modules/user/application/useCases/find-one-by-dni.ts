import { IUserRepository } from '@user/domain/repository/user.repository';
import { UserNotFoundError } from '@user/domain/exceptions/user.exceptions';
import { FindOneUserResponse } from '@user/application/responses/find-one-user';
import { ITransactionManager } from '@shared/domain/repositories/transaction.manager';
import { Transaction } from '@shared/domain/repositories/transaction';
import { User } from '@user/domain/entity/user.entity';

/**
 * Find one user by DNI.
 *
 * @param {string} dni - The DNI of the user to find
 * @param {IUserRepository} repository - The repository for accessing user data
 * @param {ITransactionManager} manager - The transaction manager for database operations
 * @return {Promise<FindOneUserResponse>} The result of finding the user by DNI
 */
export async function findOneUserByDni(dni: string, repository: IUserRepository, manager: ITransactionManager): Promise<FindOneUserResponse> {
    // Main transaction object
    const transaction = new Transaction();

    transaction.add(repository.findByDni(dni));
    
    // Commit changes
    const [user] = await manager.commit<User>(transaction);
    
    // Check if user exists
    if(!user) {
        return { isSuccess: false, error: new UserNotFoundError('dni', dni) };
    }

    return { isSuccess: true, value: user };
}