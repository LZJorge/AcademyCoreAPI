import { mockReset, mockDeep, DeepMockProxy } from 'jest-mock-extended';
import { prismaMock } from '@tests/lib/mocks/prisma.mock';
import { UserRepository } from '@user/infrastructure/repository/user.repository';
import { User } from '@user/domain/entity/user.entity';
import { generateFakeUser } from '@tests/utils/mocks/user.fake';
/* UseCases imports */
import { createUser } from '@user/application/useCases/create';
import { findOneUserById } from '@user/application/useCases/find-one-by-id';
import { findOneUserByDni } from '@user/application/useCases/find-one-by-dni';
import { findAllUser } from '@user/application/useCases/find-all';
import { findAllUserByParam } from '@user/application/useCases/find-all-by-param';
import { findAndUpdateUser } from '@user/application/useCases/update';
import { updateUserDNI } from '@user/application/useCases/update-dni';
/* Dto imports */
import { ICreateUserDto } from '@user/application/dto/create-user.dto';
import { IUpdateUserDto } from '@user/application/dto/update-user.dto';
import { FindAllByDto } from '@user/application/dto/find-all-by.dto';
import { IDniDto } from '@user/application/dto/dni.dto';
import { EntityValidationError } from '@shared/domain/exceptions/entity.validation.exception';
import { CantSearchUserByInvalidParamError, UserNotFoundError } from '@user/domain/exceptions/user.exceptions';
/* User repository Mocks */
jest.mock('@user/infrastructure/repository/user.repository', () => ({
    __esModule: true,
    UserRepository: jest.fn().mockImplementation(() => mockDeep<UserRepository>())
}));
const repositoryMock = new UserRepository(prismaMock) as unknown as DeepMockProxy<UserRepository>;
beforeEach( () => {
    mockReset(repositoryMock);
});
/* Tests */
describe('User use cases tests', () => {
    const repository = repositoryMock;
    let user: User,
        newData: User;

    beforeEach( () => {
        user = generateFakeUser();
        newData = generateFakeUser();
    });

    /**
     * @method Create
     */
    describe('Create User UseCase', () => {
        it('should create user from provided dto:', async () => {
            const createUserDto: ICreateUserDto = { ...user };
            repository.create.mockResolvedValue(user);
            const result = await createUser(createUserDto, repository);
            expect(result.isSuccess).toBeTruthy();
            if(!result.isSuccess) {
                throw new Error('Test failed');
            }
            expect(result.value).toBeDefined();
            expect(result.value).toMatchObject(createUserDto);
            expect(repository.create).toHaveBeenCalled();
        });

        it('should not create user if provided dto has invalid values:', async () => {
            const createUserDto: ICreateUserDto = { ...user, firstname: '', dni: 'x123' };
            repository.create.mockResolvedValue(null);
            const result = await createUser(createUserDto, repository);
            expect(result.isSuccess).toBeFalsy();
            if(result.isSuccess) {
                throw new Error('Test failed');
            }
            expect(result.error).toBeDefined();
            expect(result.error.data).toBeDefined();
            expect(result.error).toBeInstanceOf(EntityValidationError);
            expect(repository.create).toHaveBeenCalledTimes(0);
        });
    });

    /**
     * @method Read
     */
    describe('Find one user by id UseCase', () => {
        it('should find one user by his id:', async () => {
            repository.findOne.mockResolvedValue(user);
            const result = await findOneUserById(user.id, repository);
            expect(result.isSuccess).toBeTruthy();
            if(!result.isSuccess) {
                throw new Error('Test failed');
            }
            expect(result.value).toBeDefined();
            expect(result.value).toMatchObject(user);
            expect(repository.findOne).toHaveBeenCalled();
        });

        it('should not find user if dont exist user by provided id:', async () => {
            repository.findOne.mockResolvedValue(null);
            const result = await findOneUserById('Wrong id', repository);
            expect(result.isSuccess).toBeFalsy();
            if(result.isSuccess) {
                throw new Error('Test failed');
            }
            expect(result.error).toBeDefined();
            expect(result.error.data).toBeDefined();
            expect(result.error).toBeInstanceOf(UserNotFoundError);
            expect(repository.findOne).toHaveBeenCalled();
        });
    });

    describe('Find one user by dni UseCase', () => {
        it('should find one user by his dni:', async () => {
            repository.findByDni.mockResolvedValue(user);
            const result = await findOneUserByDni(user.dni, repository);
            expect(result.isSuccess).toBeTruthy();
            if(!result.isSuccess) {
                throw new Error('Test failed');
            }
            expect(result.value).toBeDefined();
            expect(result.value).toMatchObject(user);
            expect(repository.findByDni).toHaveBeenCalled();
        });

        it('should not find user if dont exist user by provided dni', async () => {
            repository.findByDni.mockResolvedValue(null);
            const result = await findOneUserByDni('X-123456', repository);
            expect(result.isSuccess).toBeFalsy();
            if(result.isSuccess) {
                throw new Error('Test failed');
            }
            expect(result.error).toBeDefined();
            expect(result.error).toBeInstanceOf(UserNotFoundError);
            expect(repository.findByDni).toHaveBeenCalled();
        });
    });

    describe('Find all users UseCase', () => {
        it('should find all users:', async () => {
            repository.findAll.mockResolvedValue([user]);
            const result = await findAllUser(repository);
            expect(result.isSuccess).toBeTruthy();
            if(!result.isSuccess) {
                throw new Error('Test failed');
            }
            expect(result.value).toBeDefined();
            expect(result.value).toContain(user);
            expect(repository.findAll).toHaveBeenCalled();
        });
    });

    describe('Find all users by user param UseCase', () => {
        it('should find all users by some user param:', async () => {
            let findAllByDto: FindAllByDto = { param: 'firstname', value: user.firstname };
            repository.findAllBy.mockResolvedValue([user]);
            let result = await findAllUserByParam(findAllByDto, repository);
            expect(result.isSuccess).toBeTruthy();
            if(!result.isSuccess) {
                throw new Error('Test failed');
            }
            expect(result.value).toBeDefined();
            expect(result.value).toContain(user);
            expect(repository.findAllBy).toHaveBeenCalledTimes(1);
    
            findAllByDto = { param: 'lastname', value: user.lastname };
            result = await findAllUserByParam(findAllByDto, repository);        expect(result).toBeDefined();
            expect(result.isSuccess).toBeTruthy();
            if(!result.isSuccess) {
                throw new Error('Test failed');
            }
            expect(result.value).toBeDefined();
            expect(result.value).toContain(user);
            expect(repository.findAllBy).toHaveBeenCalledTimes(2);
    
            findAllByDto = { param: 'email', value: user.email };
            result = await findAllUserByParam(findAllByDto, repository);        expect(result).toBeDefined();
            expect(result.isSuccess).toBeTruthy();
            if(!result.isSuccess) {
                throw new Error('Test failed');
            }
            expect(result.value).toBeDefined();
            expect(result.value).toContain(user);
            expect(repository.findAllBy).toHaveBeenCalledTimes(3);
    
            findAllByDto = { param: 'phone', value: user.phone };
            result = await findAllUserByParam(findAllByDto, repository);        expect(result).toBeDefined();
            expect(result.isSuccess).toBeTruthy();
            if(!result.isSuccess) {
                throw new Error('Test failed');
            }
            expect(result.value).toBeDefined();
            expect(result.value).toContain(user);
            expect(repository.findAllBy).toHaveBeenCalledTimes(4);
        });
    
        it('should not find users by invalid params:', async () => {
            const findAllByDto: FindAllByDto = { param: 'invalid param' as keyof User, value: user.firstname };
            repository.findAllBy.mockResolvedValue([]);
            const result = await findAllUserByParam(findAllByDto, repository);
            expect(result.isSuccess).toBeFalsy();
            if(result.isSuccess) {
                throw new Error('Test failed');
            }
            expect(result.error).toBeDefined();
            expect(result.error).toBeInstanceOf(CantSearchUserByInvalidParamError);
            expect(repository.findAllBy).toHaveBeenCalledTimes(0);
        });
    });

    /**
     * @method Update
     */
    describe('Update user info UseCase', () => {
        it('should return updated user:', async () => {
            const updateUserDto: IUpdateUserDto = { ...newData };
            const updated = { ...user, ...updateUserDto };
            repository.findOne.mockResolvedValue(user);
            repository.update.mockResolvedValue(updated);
            const result = await findAndUpdateUser(updated.id, updateUserDto, repository);
            expect(result.isSuccess).toBeTruthy();
            if(!result.isSuccess) {
                throw new Error('Test failed');
            }
            expect(result.value).toBeDefined();
            expect(result.value).toMatchObject(updated);
            expect(repository.update).toHaveBeenCalled();
        });

        it('should not update user if provided dto has invalid data:', async () => {
            const updateUserDto: IUpdateUserDto = { ...newData, lastname: '', phone: '' };
            const updated = { ...user, ...updateUserDto, lastname: '', phone: '' };
            repository.findOne.mockResolvedValue(user);
            repository.update.mockResolvedValue(null);
            const result = await findAndUpdateUser(updated.id, updateUserDto, repository);
            expect(result.isSuccess).toBeFalsy();
            if(result.isSuccess) {
                throw new Error('Test failed');
            }
            expect(result.error).toBeDefined();
            expect(result.error.data).toBeDefined();
            expect(result.error).toBeInstanceOf(EntityValidationError);
            expect(repository.update).toHaveBeenCalledTimes(0);
        });
    });

    describe('Update user dni UseCase', () => {
        it('should return updated dni user:', async () => {
            const updated = { ...user, dni: newData.dni };
            const dto: IDniDto = { dni: updated.dni };
            repository.findOne.mockResolvedValue(user);
            repository.updateDni.mockResolvedValue(updated);
            const result = await updateUserDNI(updated.id, dto, repository);
            expect(result.isSuccess).toBeTruthy();
            if(!result.isSuccess) {
                throw new Error('Test failed');
            }
            expect(result.value).toBeDefined();
            expect(result.value).toMatchObject(updated);
            expect(repository.updateDni).toHaveBeenCalled();
        });

        it('should not update user dni if provided dni are invalid:', async () => {
            const updated = { ...user, dni: 'X-12345' };
            const dto: IDniDto = { dni: updated.dni };
            repository.findOne.mockResolvedValue(user);
            repository.updateDni.mockResolvedValue(null);
            const result = await updateUserDNI(updated.id, dto, repository);
            expect(result.isSuccess).toBeFalsy();
            if(result.isSuccess) {
                throw new Error('Test failed');
            }
            expect(result.error).toBeDefined();
            expect(result.error.data).toBeDefined();
            expect(result.error).toBeInstanceOf(EntityValidationError);
            expect(repository.updateDni).toHaveBeenCalledTimes(0);
        });
    });
});