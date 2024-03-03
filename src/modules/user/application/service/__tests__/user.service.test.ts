import { mockReset } from 'jest-mock-extended';
import { UserService } from '@user/application/service/user.service';
import { User } from '@user/domain/entity/user.entity';
import { generateFakeUser } from '@tests/utils/mocks/user.fake';
import { managerMock } from '@shared/domain/repositories/mocks/transaction.manager.mock';
import { userRepositoryMock } from '@user/domain/repository/mocks/user.repository.mock';

/**
 * Usecases
 * Mocks
 */
import { createUser } from '@user/application/useCases/create';
jest.mock('@user/application/useCases/create');

import { findOneUserById } from '@user/application/useCases/find-one-by-id';
jest.mock('@user/application/useCases/find-one-by-id');

import { findOneUserByDni } from '@user/application/useCases/find-one-by-dni';
jest.mock('@user/application/useCases/find-one-by-dni');

import { findAllUser } from '@user/application/useCases/find-all';
jest.mock('@user/application/useCases/find-all');

import { findAllUserByParam } from '@user/application/useCases/find-all-by-param';
jest.mock('@user/application/useCases/find-all-by-param');

import { findAndUpdateUser } from '@user/application/useCases/update';
jest.mock('@user/application/useCases/update');

import { findAndUpdateUserDNI } from '@user/application/useCases/update-dni';
jest.mock('@user/application/useCases/update-dni');

/**
 * DTOs
 */
import { ICreateUserDto } from '@user/application/dto/create-user.dto';
import { IUpdateUserDto } from '@user/application/dto/update-user.dto';
import { FindAllByDto } from '@user/application/dto/find-all-by.dto';
import { IDniDto } from '@user/application/dto/dni.dto';

describe('User Service tests', () => {
    const repository = userRepositoryMock;
    let service: UserService,
        user: User;

    beforeEach( () => {
        mockReset(repository);

        user = generateFakeUser();
        service = new UserService(repository, managerMock);
    });

    /**
     * @method Create
     */
    describe('Create User UseCases', () => {
        it('should create user from provided dto:', async () => {
            const createUserDto: ICreateUserDto = { ...user };
            await service.create(createUserDto);
            expect(createUser).toHaveBeenCalledWith(createUserDto, repository, managerMock);
        });
    });

    /**
     * @method Read
     */
    describe('Find User UseCases', () => {
        it('should find one user by his id:', async () => {
            await service.findOneByID(user.id);
            expect(findOneUserById).toHaveBeenCalledWith(user.id, repository, managerMock);
        });

        it('should find one user by his dni:', async () => {
            await service.findOneByDNI(user.dni);
            expect(findOneUserByDni).toHaveBeenCalledWith(user.dni, repository, managerMock);
        });

        it('should find all users:', async () => {
            await service.findAll();
            expect(findAllUser).toHaveBeenCalledWith(repository, managerMock);
        });

        it('should find all users by some user param:', async () => {
            const findAllByDto: FindAllByDto = { param: 'firstname', value: user.firstname };
            repository.findAllBy.mockResolvedValue([user]);

            await service.findAllBy(findAllByDto);
            expect(findAllUserByParam).toHaveBeenCalledWith(findAllByDto, repository, managerMock);
        });
    });

    /**
     * @method Update
     */
    describe('Update User UseCases', () => {
        const newData = generateFakeUser();

        it('should return updated user:', async () => {
            const updateUserDto: IUpdateUserDto = { ...newData };
            const updated = { ...user, ...newData };
            await service.updateInfo(updated.id, updateUserDto);
            expect(findAndUpdateUser).toHaveBeenCalledWith({ id: updated.id, dto: updateUserDto}, repository, managerMock);
        });

        it('should return updated dni user:', async () => {
            const updated = { ...user, dni: newData.dni };
            const dto: IDniDto = { dni: updated.dni };
            await service.updateDNI(updated.id, dto);
            expect(findAndUpdateUserDNI).toHaveBeenCalledWith({ id: updated.id, dto }, repository, managerMock);
        });
    });
});