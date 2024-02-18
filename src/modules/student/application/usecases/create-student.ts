import { CreateStudentResponse } from '@student/application/responses/create-student.response';
import { IStudentRepository } from '@student/domain/repository/student.repository';
import { IUserRepository } from '@user/domain/repository/user.repository';
import { CreateUserDto, ICreateUserDto } from '@user/application/dto/create-user.dto';
import { UserFactory } from '@user/application/factory/user.factory';
import { StudentFactory } from '@student/application/factory/student.factory';
import { User } from '@user/domain/entity/user.entity';
import { ITransactionManager } from '@shared/domain/repositories/transaction.manager';
import { Transaction } from '@shared/domain/repositories/transaction';

type RequiredRepositories = {
    user: IUserRepository,
    student: IStudentRepository
};

export async function createStudent(data: ICreateUserDto, repositories: RequiredRepositories, manager: ITransactionManager): Promise<CreateStudentResponse> {
    // Main Transaction object
    const transaction = new Transaction();
    
    // Handling validation
    const dto = new CreateUserDto(data);
    const validation = await dto.validate();

    if(!validation.isSuccess) {
        return { isSuccess: false, error: validation.error };
    }

    // Verify if user already exists
    transaction.add(repositories.user.findByDni(data.dni));
    let [user] = await manager.commit<User>(transaction);

    transaction.clear();

    if(!user || user == null) {
        user = UserFactory.create(data);
        transaction.add(repositories.user.create(user));
    }

    // Create student
    const student = StudentFactory.create(user.id);
    transaction.add(repositories.student.create(student));

    // Execute transaction
    await manager.commit(transaction);

    return { isSuccess: true, value: student };
}