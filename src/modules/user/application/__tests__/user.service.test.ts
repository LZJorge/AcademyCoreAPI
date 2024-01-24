import { mockReset, mockDeep, DeepMockProxy } from 'jest-mock-extended';
import { prismaMock } from '@tests/lib/mocks/prisma.mock';
import { UserService } from '@user/application/user.service';
import { UserRepository } from '@user/infrastructure/repository/user.repository';
import { User } from '@user/domain/entity/user.entity';
import { generateFakeUser } from '@tests/utils/mocks/user.fake';

/* UseCases imports */
import { createUser } from '@user/application/useCases/create';
jest.mock('@user/application/useCases/create', () => ({
    createUser: jest.fn().mockImplementation(() => mockDeep<typeof createUser>())
}));

import { findOneUserById } from '@user/application/useCases/find-one-by-id';
jest.mock('@user/application/useCases/find-one-by-id', () => ({
    findOneUserById: jest.fn().mockImplementation(() => mockDeep<typeof findOneUserById>())
}));

import { findOneUserByDni } from '@user/application/useCases/find-one-by-dni';
jest.mock('@user/application/useCases/find-one-by-dni', () => ({
    findOneUserByDni: jest.fn().mockImplementation(() => mockDeep<typeof findOneUserByDni>())
}));

import { findAllUser } from '@user/application/useCases/find-all';
jest.mock('@user/application/useCases/find-all', () => ({
    findAllUser: jest.fn().mockImplementation(() => mockDeep<typeof findAllUser>())
}));

import { findAllUserByParam } from '@user/application/useCases/find-all-by-param';
jest.mock('@user/application/useCases/find-all-by-param', () => ({
    findAllUserByParam: jest.fn().mockImplementation(() => mockDeep<typeof findAllUserByParam>())
}));

import { findAndUpdateUser } from '@user/application/useCases/update';
jest.mock('@user/application/useCases/update', () => ({
    findAndUpdateUser: jest.fn().mockImplementation(() => mockDeep<typeof findAndUpdateUser>())
}));

import { updateUserDNI } from '@user/application/useCases/update-dni';
jest.mock('@user/application/useCases/update-dni', () => ({
    updateUserDNI: jest.fn().mockImplementation(() => mockDeep<typeof updateUserDNI>())
}));

/* Dto imports */
import { ICreateUserDto } from '@user/application/dto/create-user.dto';
import { IUpdateUserDto } from '@user/application/dto/update-user.dto';
import { FindAllByDto } from '@user/application/dto/find-all-by.dto';
import { IDniDto } from '@user/application/dto/dni.dto';

jest.mock('@user/infrastructure/repository/user.repository', () => ({
    __esModule: true,
    UserRepository: jest.fn().mockImplementation(() => mockDeep<UserRepository>())
}));
const repositoryMock = new UserRepository(prismaMock) as unknown as DeepMockProxy<UserRepository>;
beforeEach( () => {
    mockReset(repositoryMock);
});

describe('User Service tests', () => {
    const repository = repositoryMock;
    let service: UserService,
        user: User;

    beforeEach( () => {
        user = generateFakeUser();
        service = new UserService(repository);
    });

    /**
     * @method Create
     */
    describe('Create User UseCases', () => {
        it('should create user from provided dto:', async () => {
            const createUserDto: ICreateUserDto = { ...user };
            await service.create(createUserDto);
            expect(createUser).toHaveBeenCalledWith(createUserDto, repository);
        });
    });

    /**
     * @method Read
     */
    describe('Find User UseCases', () => {
        it('should find one user by his id:', async () => {
            await service.findOneByID(user.id);
            expect(findOneUserById).toHaveBeenCalledWith(user.id, repository);
        });

        it('should find one user by his dni:', async () => {
            await service.findOneByDNI(user.dni);
            expect(findOneUserByDni).toHaveBeenCalledWith(user.dni, repository);
        });

        it('should find all users:', async () => {
            await service.findAll();
            expect(findAllUser).toHaveBeenCalledWith(repository);
        });

        it('should find all users by some user param:', async () => {
            const findAllByDto: FindAllByDto = { param: 'firstname', value: user.firstname };
            repository.findAllBy.mockResolvedValue([user]);

            await service.findAllBy(findAllByDto);
            expect(findAllUserByParam).toHaveBeenCalledWith(findAllByDto, repository);
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
            expect(findAndUpdateUser).toHaveBeenCalledWith(updated.id, updateUserDto, repository);
        });

        it('should return updated dni user:', async () => {
            const updated = { ...user, dni: newData.dni };
            const dto: IDniDto = { dni: updated.dni };
            await service.updateDNI(updated.id, dto);
            expect(updateUserDNI).toHaveBeenCalledWith(updated.id, dto, repository);
        });
    });
});