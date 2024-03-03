import { FindOneStudentResponse } from '@student/application/responses/find-one-student.response';
import { Student } from '@student/domain/entity/student.entity';
import { StudentNotFoundError } from '@student/domain/exceptions/student.exceptions';
import { IStudentRepository } from '@student/domain/repository/student.repository';
import { Transaction } from '@shared/domain/repositories/transaction';
import { ITransactionManager } from '@shared/domain/repositories/transaction.manager';

/**
 * Finds a student by ID using the provided student repository and transaction manager.
 *
 * @param {string} id - The ID of the student to find.
 * @param {IStudentRepository} repository - The repository for accessing student data.
 * @param {TransactionManager} manager - The transaction manager for handling the database transaction.
 * @return {Promise<FindOneStudentResponse>} The response containing the success status and the found student, or an error if the student is not found.
 */
export async function findOneStudentById(id: string, repository: IStudentRepository, manager: ITransactionManager): Promise<FindOneStudentResponse> {
    // Main Transaction object
    const transaction = new Transaction();

    transaction.add(repository.findOne(id));

    // Execute transaction
    const [student] = await manager.commit<Student>(transaction);

    // Verify if user exists by the provided id
    if(!student || student == null) {
        return { isSuccess: false, error: new StudentNotFoundError('id', id) };
    }

    return { isSuccess: true, value: student };
}