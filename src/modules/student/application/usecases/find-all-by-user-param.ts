import { ITransactionManager } from '@shared/domain/repositories/transaction.manager';
import { IStudentRepository } from '@student/domain/repository/student.repository';
import { FindManyStudentsResponse } from '@student/application/responses/find-many-student.response';
import { Student } from '@student/domain/entity/student.entity';
import { FindAllByDto } from '@user/application/dto/find-all-by.dto';
import { canSearchUserByParam } from '@user/domain/values/canSearchUserBy';
import { CantSearchUserByInvalidParamError } from '@user/domain/exceptions/user.exceptions';
import { Transaction } from '@shared/domain/repositories/transaction';

/**
 * Find many students by user parameter.
 *
 * @param {FindAllByDto} dto - the data transfer object for finding all by parameter
 * @param {IStudentRepository} repository - the repository for accessing student data
 * @param {TransactionManager} manager - the transaction manager for handling database transactions
 * @return {Promise<FindManyStudentsResponse>} a promise that resolves to the response of finding many students
 */
export async function findManyStudentsByUserParam(dto: FindAllByDto, repository: IStudentRepository, manager: ITransactionManager): Promise<FindManyStudentsResponse>  {
    // Main Transaction object
    const transaction = new Transaction();

    // Verify if search param is valid
    if(!canSearchUserByParam(dto.param)) {
        return { isSuccess: false, error: new CantSearchUserByInvalidParamError(dto.param, dto.value) };
    }
    
    transaction.add(repository.findAllByUserParam(dto.param, dto.value));

    // Execute transaction
    const [students] = await manager.commit<Student[]>(transaction);

    return { isSuccess: true, value: students };
}