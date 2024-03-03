import { ICreateUserDto } from '@user/application/dto/create-user.dto';
import { IUserRepository } from '@user/domain/repository/user.repository';
import { CreateUserResponse } from '@user/application/responses/create-user';
import { UserFactory } from '@user/application/factory/user.factory';
import { ITransactionManager } from '@shared/domain/repositories/transaction.manager';
import { Transaction } from '@shared/domain/repositories/transaction';
import { User } from '@user/domain/entity/user.entity';
import { UserDniAlreadyExistsError } from '@user/domain/exceptions/user.exceptions';

/**
 * Create a new user if the user does not already exist, and return the response.
 *
 * @param {ICreateUserDto} data - the data for creating a new user
 * @param {IUserRepository} repository - the repository for user data storage
 * @param {ITransactionManager} manager - the transaction manager for database operations
 * @return {Promise<CreateUserResponse>} the response containing the success status and the user data
 */
export async function createUser(data: ICreateUserDto, repository: IUserRepository, manager: ITransactionManager): Promise<CreateUserResponse> {
    const transaction = new Transaction();
    
    // Check if user already exists
    transaction.add(repository.findByDni(data.dni));
    const [userAlreadyExists] = await manager.commit<User>(transaction);
    transaction.clear();
    if(userAlreadyExists) {
        return { isSuccess: false, error: new UserDniAlreadyExistsError(data.dni) };
    }
    
    // Create user
    const user = UserFactory.create(data);
    transaction.add(repository.create(user));

    // Commit changes
    await manager.commit<User>(transaction);

    return { isSuccess: true, value: user }; 
}