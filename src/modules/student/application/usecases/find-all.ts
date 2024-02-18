import { ITransactionManager } from '@shared/domain/repositories/transaction.manager';
import { IStudentRepository } from '@student/domain/repository/student.repository';
import { FindManyStudentsResponse } from '@student/application/responses/find-many-student.response';
import { Student } from '@student/domain/entity/student.entity';
import { Transaction } from '@shared/domain/repositories/transaction'; 

/**
 * Finds many students from the given repository using the provided transaction manager.
 *
 * @param {IStudentRepository} repository - The repository for finding students
 * @param {ITransactionManager} manager - The transaction manager for handling the database transaction
 * @return {Promise<FindManyStudentsResponse>} A promise that resolves to the response containing the found students
 */
export async function findManyStudents(repository: IStudentRepository, manager: ITransactionManager): Promise<FindManyStudentsResponse>  {
    // Main Transaction object
    const transaction = new Transaction();
    
    transaction.add(repository.findAll());

    // Execute transaction
    const [students] = await manager.commit<Student[]>(transaction);

    return { isSuccess: true, value: students };
}