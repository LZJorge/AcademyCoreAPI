import { FindAllByDto } from '@user/application/dto/find-all-by.dto';
import { IUserRepository } from '@user/domain/repository/user.repository';
import { FindManyUserResponse } from '@user/application/responses/find-many-user';
import { canSearchUserByParam } from '@user/domain/values/canSearchUserBy';
import { CantSearchUserByInvalidParamError } from '@user/domain/exceptions/user.exceptions';
import { ITransactionManager } from '@shared/domain/repositories/transaction.manager';
import { Transaction } from '@shared/domain/repositories/transaction';
import { User } from '@user/domain/entity/user.entity';

/**
 * Find all users by parameter.
 *
 * @param {FindAllByDto} dto - the data transfer object containing the parameter
 * @param {IUserRepository} repository - the user repository context
 * @return {Promise<FindManyUserResponse>} the response containing the success indicator and value
 */
export async function findAllUserByParam(dto: FindAllByDto, repository: IUserRepository, manager: ITransactionManager): Promise<FindManyUserResponse> {
    // Check if parameter is valid
    if(!canSearchUserByParam(dto.param)) {
        return { isSuccess: false, error: new CantSearchUserByInvalidParamError(dto.param, dto.value) };
    }

    // Main transaction object
    const transaction = new Transaction();

    // Find all users
    transaction.add(repository.findAllBy(dto.param, dto.value));

    // Commit changes
    const [users] = await manager.commit<User[]>(transaction);

    return { isSuccess: true, value: users ? users : [] };
}