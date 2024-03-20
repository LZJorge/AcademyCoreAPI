import { User } from '@user/domain/entity/user.entity';
import { IUserRepository } from '@user/domain/repository/user.repository';
import { IDniDto } from '@user/application/dto/dni.dto';
import { UserNotFoundError } from '@user/domain/exceptions/user.exceptions';
import { UpdateUserResponse } from '@user/application/responses/update-user';
import { ITransactionManager } from '@shared/domain/repositories/transaction.manager';
import { Transaction } from '@shared/domain/repositories/transaction';

/**
 * Finds and updates the user's DNI in the repository.
 *
 * @param {Object} data - An object containing the user ID and DNI data
 * @param {IUserRepository} repository - The repository for user data
 * @param {ITransactionManager} manager - The transaction manager for database operations
 * @return {Promise<UpdateUserResponse>} A promise that resolves with the updated user response
 */
export async function findAndUpdateUserDNI(data: {id: string, dto: IDniDto}, repository: IUserRepository, manager: ITransactionManager): Promise<UpdateUserResponse> {
    const transaction = new Transaction();

    // Find user
    transaction.add(repository.findOne(data.id));

    const [current] = await manager.commit<User>(transaction);
    if(!current) {
        return { isSuccess: false, error: new UserNotFoundError('id', data.id) };
    }
    
    // Update user
    const updatedUser: User = { 
        ...current, 
        dni: data.dto.dni, 
        id: data.id, 
        updated_at: new Date() 
    };
    transaction.add(repository.updateDni(updatedUser));

    // Commit changes
    await manager.commit(transaction);

    return { isSuccess: true, value: updatedUser };
}