import { ITransactionManager } from '@shared/domain/repositories/transaction.manager';
import { Transaction } from '@shared/domain/repositories/transaction';
import { User } from '@user/domain/entity/user.entity';
import { IUserRepository } from '@user/domain/repository/user.repository';
import { IUpdateUserDto } from '@user/application/dto/update-user.dto';
import { UserNotFoundError } from '@user/domain/exceptions/user.exceptions';
import { UpdateUserResponse } from '@user/application/responses/update-user';

/**
 * Find and update a user in the repository.
 *
 * @param {object} data - The user id and the DTO for updating the user.
 * @param {IUserRepository} repository - The user repository context.
 * @param {ITransactionManager} manager - The transaction manager for database operations.
 * @return {Promise<UpdateUserResponse>} The response after updating the user.
 */
export async function findAndUpdateUser(data: { id: string, dto: IUpdateUserDto }, repository: IUserRepository, manager: ITransactionManager): Promise<UpdateUserResponse> {
    const transaction = new Transaction();
    
    // Find user
    transaction.add(repository.findOne(data.id));
    const [current] = await manager.commit<User>(transaction);
    
    if(!current) {
        return { isSuccess: false, error: new UserNotFoundError('id', data.id) };
    }
    
    // Update user
    const updatedUser: User = { ...current, ...data.dto, updated_at: new Date() };
    transaction.add(repository.update(updatedUser));

    // Commit changes
    await manager.commit(transaction);

    return { isSuccess: true, value: updatedUser };
}