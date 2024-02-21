import { FindOneStudentResponse } from '@student/application/responses/find-one-student.response';
import { Student } from '@student/domain/entity/student.entity';
import { StudentNotFoundError } from '@student/domain/exceptions/student-not-found.exception';
import { IStudentRepository } from '@student/domain/repository/student.repository';
import { Transaction } from '@shared/domain/repositories/transaction';
import { ITransactionManager } from '@shared/domain/repositories/transaction.manager';

/**
 * Finds a student by their DNI using the provided student repository and transaction manager.
 *
 * @param {string} dni - The DNI of the student to find
 * @param {IStudentRepository} repository - The repository for accessing student data
 * @param {TransactionManager} manager - The transaction manager for handling the database transaction
 * @return {Promise<FindOneStudentResponse>} An object containing the success status and the student found
 */
export async function findOneStudentByUserDni(dni: string, repository: IStudentRepository, manager: ITransactionManager): Promise<FindOneStudentResponse> {
    // Main Transaction object
    const transaction = new Transaction();

    transaction.add(repository.findOneByUserDni(dni));

    // Execute transaction
    const [student] = await manager.commit<Student>(transaction);

    // Verify if user exists by the provided dni
    if(!student || student == null) {
        return { isSuccess: false, error: new StudentNotFoundError('dni', dni) };
    }

    return { isSuccess: true, value: student };
}