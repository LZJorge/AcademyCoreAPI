import { Transaction } from '@shared/domain/repositories/transaction';
import { ITransactionManager } from '@shared/domain/repositories/transaction.manager';
import { IUpdateStudentCoursesCompletedDto } from '@student/application/dto/update-student-courses_completed.dto';
import { UpdateStudentResponse } from '@student/application/responses/update-student.response';
import { Student } from '@student/domain/entity/student.entity';
import { IStudentRepository } from '@student/domain/repository/student.repository';
import { StudentNotFoundError } from '@student/domain/exceptions/student.exceptions';

/**
 * Updates the status of a student in the repository.
 *
 * @param {Object} data - An object containing the student's id and the new status
 * @param {IStudentRepository} repository - The repository for accessing student data
 * @param {ITransactionManager} manager - The transaction manager for handling database transactions
 * @return {Promise<UpdateStudentResponse>} A promise that resolves to the response after updating the student status
 */
export async function findAndUpdateStudentCoursesCompleted(data: { id: string, dto: IUpdateStudentCoursesCompletedDto }, repository: IStudentRepository, manager: ITransactionManager): Promise<UpdateStudentResponse> {
    // Main Transaction object
    const transaction = new Transaction();

    // verify if student exists
    transaction.add(repository.findOne(data.id));
    const [student] = await manager.commit<Student>(transaction);
    if(!student) {
        return { isSuccess: false, error: new StudentNotFoundError('id', data.id) };
    }

    // update student
    const updatedStudent: Student = { ...student, courses_completed: student.courses_completed + data.dto.courses_completed };

    transaction.add(repository.update(updatedStudent));

    // Execute transaction
    await manager.commit<Student>(transaction);

    return { isSuccess: true, value: updatedStudent };
}