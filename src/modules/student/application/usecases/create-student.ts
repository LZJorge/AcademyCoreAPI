import { ITransactionManager } from '@shared/domain/repositories/transaction.manager';
import { Transaction } from '@shared/domain/repositories/transaction';
import { IUserRepository } from '@user/domain/repository/user.repository';
import { UserFactory } from '@user/application/factory/user.factory';
import { User } from '@user/domain/entity/user.entity';
import { CreateStudentResponse } from '@student/application/responses/create-student.response';
import { IStudentRepository } from '@student/domain/repository/student.repository';
import { StudentFactory } from '@student/application/factory/student.factory';
import { Student } from '@student/domain/entity/student.entity';
import { StudentAlreadyRegisteredError } from '@student/domain/exceptions/student.exceptions';
import { ICreateStudentDto } from '@student/application/dto/create-student.dto';
import { IStudentPasswordRepository } from '@student/domain/repository/password.repository';

type RequiredRepositories = {
    user: IUserRepository,
    student: IStudentRepository,
    student_password: IStudentPasswordRepository
};

/**
 * Creates a new student with the given user data and repositories, using the provided transaction manager to ensure data consistency.
 *
 * @param {ICreateStudentDto} data - the user data for creating the student
 * @param {RequiredRepositories} repositories - the required repositories for data access
 * @param {ITransactionManager} manager - the transaction manager for ensuring data consistency
 * @return {Promise<CreateStudentResponse>} a promise that resolves to the response containing the created student
 */
export async function createStudent(data: ICreateStudentDto, repositories: RequiredRepositories, manager: ITransactionManager): Promise<CreateStudentResponse> {
    // Main Transaction object
    const transaction = new Transaction();

    // Verify if user already exists
    transaction.add(repositories.user.findByDni(data.user.dni));
    let [user] = await manager.commit<User>(transaction);

    transaction.clear();

    if(user) {
        transaction.add(repositories.student.findOneByUserId(user.id));

        const [studentAlreadyExists] = await manager.commit<Student>(transaction);
        
        transaction.clear();

        // Verify if student already exists
        if(studentAlreadyExists && studentAlreadyExists.user_id == user.id) {
            return { isSuccess: false, error: new StudentAlreadyRegisteredError(user.id) };
        }
    }

    if(!user || user == null) {
        // Create user
        user = UserFactory.create(data.user);
        transaction.add(repositories.user.create(user));
    }

    // Create student
    const student = StudentFactory.create(user.id);
    transaction.add(repositories.student.create(student));

    // Create student password
    const student_password = await StudentFactory.hashPassword(data.student_password, student.id);
    transaction.add(repositories.student_password.create(student_password));

    // Execute transaction
    await manager.commit(transaction);

    // Add user to student
    student.user = user;
    
    return { isSuccess: true, value: student };
}