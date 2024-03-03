import { User } from '@user/domain/entity/user.entity';

/**
 * Interfaces
 */
import { IUserRepository } from '@user/domain/repository/user.repository';
import { IStudentRepository } from '@student/domain/repository/student.repository';
import { ITransactionManager } from '@shared/domain/repositories/transaction.manager';

/**
 * Usecases
 */
import { createStudent } from '@student/application/usecases/create-student';
import { findOneStudentById } from '@student/application/usecases/find-one-by-id';
import { findOneStudentByUserDni } from '@student/application/usecases/find-one-by-dni';
import { findManyStudents } from '@student/application/usecases/find-all';
import { findManyStudentsByUserParam } from '@student/application/usecases/find-all-by-user-param';
import { findAndUpdateUser } from '@user/application/useCases/update';
import { findAndUpdateStudentCoursesCompleted } from '@student/application/usecases/update-student-courses';
import { findAndUpdateStudentStatus } from '@student/application/usecases/update-student-status';
import { findAndUpdateUserDNI } from '@user/application/useCases/update-dni';

/**
 * Dtos
 */
import { ICreateUserDto } from '@user/application/dto/create-user.dto';
import { IUpdateUserDto } from '@user/application/dto/update-user.dto';
import { IDniDto } from '@user/application/dto/dni.dto';

/**
 * Responses
 */
import { CreateStudentResponse } from '@student/application/responses/create-student.response';
import { FindOneStudentResponse } from '@student/application/responses/find-one-student.response';
import { FindManyStudentsResponse } from '@student/application/responses/find-many-student.response';
import { UpdateUserResponse } from '@user/application/responses/update-user';
import { UpdateStudentResponse } from '@student/application/responses/update-student.response';

interface RequiredRepositories {
    user: IUserRepository,
    student: IStudentRepository
}

export class StudentService {
    constructor(
        private readonly repositories: RequiredRepositories,
        private readonly manager: ITransactionManager
    ) {}

    /**
     * Creates a user using the provided data.
     *
     * @param {ICreateUserDto} data - the data for creating the user
     * @return {Promise<CreateStudentResponse>} the response after creating the user
     */
    async create(data: ICreateUserDto): Promise<CreateStudentResponse> {
        return await createStudent(data, { user: this.repositories.user, student: this.repositories.student }, this.manager);
    }

    /**
     * Finds a student by ID.
     *
     * @param {string} id - The ID of the student to find.
     * @return {Promise<FindOneStudentResponse>} The response with the found student.
     */
    async findOneById(id: string): Promise<FindOneStudentResponse> {
        return await findOneStudentById(id, this.repositories.student, this.manager);
    }

    /**
     * Find one student by DNI.
     *
     * @param {string} dni - the DNI of the student
     * @return {Promise<FindOneStudentResponse>} the response of finding one student
     */
    async findOneByDni(dni: string): Promise<FindOneStudentResponse> {
        return await findOneStudentByUserDni(dni, this.repositories.student, this.manager);
    }

    /**
     * Find all students.
     *
     * @return {Promise<FindManyStudentsResponse>} the response of finding all students
     */
    async findMany(): Promise<FindManyStudentsResponse> {
        return await findManyStudents(this.repositories.student, this.manager);
    }

    /**
     * Find many students by user parameter.
     *
     * @param {keyof User} param - the parameter of the user
     * @return {Promise<FindManyStudentsResponse>} the response of finding many students
     */
    async findManyByUserParam(param: keyof User, value: string | number | Date): Promise<FindManyStudentsResponse> {
        return await findManyStudentsByUserParam({ param, value }, this.repositories.student, this.manager);
    }

    /**
     * Update the number of courses completed for a student.
     *
     * @param {string} student_id - The ID of the student
     * @param {number} courses_completed - The number of courses completed
     * @return {Promise<UpdateStudentResponse>} The result of the update operation
     */
    async updateStudentCoursesCompleted(student_id: string, courses_completed: number): Promise<UpdateStudentResponse> {
        return await findAndUpdateStudentCoursesCompleted({ id: student_id, dto: { courses_completed } }, this.repositories.student, this.manager);
    }

    /**
     * Updates the status of a student.
     *
     * @param {string} student_id - the ID of the student
     * @param {boolean} is_active - the new status of the student
     * @return {Promise<UpdateStudentResponse>} the response after updating the student status
     */
    async updateStudentStatus(student_id: string, is_active: boolean): Promise<UpdateStudentResponse> {
        return await findAndUpdateStudentStatus({ id: student_id, dto: { is_active } }, this.repositories.student, this.manager);
    }

    /**
     * Updates a user with the given user ID and data.
     *
     * @param {string} user_id - the ID of the user to update
     * @param {IUpdateUserDto} data - the data to update the user with
     * @return {Promise<UpdateUserResponse>} the updated user response
     */
    async updateUser(user_id: string, data: IUpdateUserDto): Promise<UpdateUserResponse> {
        return await findAndUpdateUser({id: user_id, dto: data}, this.repositories.user, this.manager);
    }

    /**
     * Updates a user with the given user DNI and data.
     *
     * @param {string} user_id - the DNI of the user to update
     * @param {IDniDto} data - the data to update the user with
     * @return {Promise<UpdateUserResponse>} the updated user response
     */
    async updateUserDni(user_id: string, data: IDniDto): Promise<UpdateUserResponse> {
        return await findAndUpdateUserDNI({id: user_id, dto: data}, this.repositories.user, this.manager);
    }
}