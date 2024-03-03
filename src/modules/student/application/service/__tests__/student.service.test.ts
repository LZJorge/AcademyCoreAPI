/**
 * Interfaces mocks
 */
import { userRepositoryMock } from '@user/domain/repository/mocks/user.repository.mock';
import { studentRepositoryMock } from '@student/domain/repository/mocks/student.repository.mock';
import { managerMock } from '@shared/domain/repositories/mocks/transaction.manager.mock';

/**
 * Usecases
 */
import { createStudent } from '@student/application/usecases/create-student';
jest.mock('@student/application/usecases/create-student');

import { findOneStudentById } from '@student/application/usecases/find-one-by-id';
jest.mock('@student/application/usecases/find-one-by-id');

import { findOneStudentByUserDni } from '@student/application/usecases/find-one-by-dni';
jest.mock('@student/application/usecases/find-one-by-dni');

import { findManyStudents } from '@student/application/usecases/find-all';
jest.mock('@student/application/usecases/find-all');

import { findManyStudentsByUserParam } from '@student/application/usecases/find-all-by-user-param';
jest.mock('@student/application/usecases/find-all-by-user-param');

import { findAndUpdateUser } from '@user/application/useCases/update';
jest.mock('@user/application/useCases/update');

import { findAndUpdateStudentCoursesCompleted } from '@student/application/usecases/update-student-courses';
jest.mock('@student/application/usecases/update-student-courses');

import { findAndUpdateStudentStatus } from '@student/application/usecases/update-student-status';
jest.mock('@student/application/usecases/update-student-status');

import { findAndUpdateUserDNI } from '@user/application/useCases/update-dni';
jest.mock('@user/application/useCases/update-dni');

/**
 * Dtos
 */
import { ICreateUserDto } from '@user/application/dto/create-user.dto';
import { IUpdateUserDto } from '@user/application/dto/update-user.dto';
import { IDniDto } from '@user/application/dto/dni.dto';

/**
 * Service
 */
import { StudentService } from '@student/application/service/student.service';
import { mockReset } from 'jest-mock-extended';
import { generateFakeStudent } from '@tests/utils/mocks/user.fake';

describe('Student service test', () => {
    let service: StudentService;
    const student = generateFakeStudent();

    beforeEach(() => {
        service = new StudentService({ user: userRepositoryMock, student: studentRepositoryMock }, managerMock);
        mockReset(managerMock);
    });

    /**
     * @method Create
     */
    describe('Create', () => {
        it('should call create student usecase', async () => {
            const dto: ICreateUserDto = {
                dni: student.user.dni,
                firstname: student.user.firstname,
                lastname: student.user.lastname,
                birthdate: student.user.birthdate,
                phone: student.user.phone,
                email: student.user.email
            };

            await service.create(dto);
            expect(createStudent).toHaveBeenCalledWith(
                dto,
                { user: userRepositoryMock, student: studentRepositoryMock },
                managerMock
            );
        });
    });

    /**
     * @method Find
     */
    describe('Find', () => {
        it('should call find one student by id usecase', async () => {
            const id = student.id;
            await service.findOneById(id);
            expect(findOneStudentById).toHaveBeenCalledWith(
                id,
                studentRepositoryMock,
                managerMock
            );
        });

        it('should call find one student by dni usecase', async () => {
            const dni = student.user.dni;
            await service.findOneByDni(dni);
            expect(findOneStudentByUserDni).toHaveBeenCalledWith(
                dni,
                studentRepositoryMock,
                managerMock
            );
        });

        it('should call find many students usecase', async () => {
            await service.findMany();
            expect(findManyStudents).toHaveBeenCalledWith(
                studentRepositoryMock,
                managerMock
            );
        });

        it('should call find many students by user param usecase', async () => {
            await service.findManyByUserParam('dni', student.user.dni);
            expect(findManyStudentsByUserParam).toHaveBeenCalledWith(
                { param: 'dni', value: student.user.dni },
                studentRepositoryMock,
                managerMock
            );
        });
    });

    /**
     * @method Update
     */
    describe('Update', () => {
        it('should call update user usecase', async () => {
            const id = student.id;
            const dto: IUpdateUserDto = {
                firstname: student.user.firstname,
                lastname: student.user.lastname,
                birthdate: student.user.birthdate,
                phone: student.user.phone,
                email: student.user.email
            };
            await service.updateUser(id, dto);
            expect(findAndUpdateUser).toHaveBeenCalledWith(
                {id, dto},
                userRepositoryMock,
                managerMock
            );
        });


        it('should call update user dni usecase', async () => {
            const id = student.id;
            const dto: IDniDto = {
                dni: student.user.dni
            };
            await service.updateUserDni(id, dto);
            expect(findAndUpdateUserDNI).toHaveBeenCalledWith(
                { id, dto },
                userRepositoryMock,
                managerMock
            );
        });

        it('should call update student courses_completed usecase', async () => {
            const id = student.id;
            const dto = {
                courses_completed: student.courses_completed
            };
            await service.updateStudentCoursesCompleted(id, dto.courses_completed);
            expect(findAndUpdateStudentCoursesCompleted).toHaveBeenCalledWith(
                { id, dto },
                studentRepositoryMock,
                managerMock
            );
        });

        it('should call update student status usecase', async () => {
            const id = student.id;
            const dto = {
                is_active: student.is_active
            };
            await service.updateStudentStatus(id, dto.is_active);
            expect(findAndUpdateStudentStatus).toHaveBeenCalledWith(
                { id, dto },
                studentRepositoryMock,
                managerMock
            );
        });
    });
});