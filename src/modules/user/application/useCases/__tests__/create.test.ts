import { generateFakeUser } from '@tests/utils/mocks/user.fake';
import { userRepositoryMock } from '@user/domain/repository/mocks/user.repository.mock';
import { ICreateUserDto } from '@user/application/dto/create-user.dto';
import { createUser } from '@user/application/useCases/create';
import { User } from '@user/domain/entity/user.entity';
import { managerMock } from '@shared/domain/repositories/mocks/transaction.manager.mock';
import { UserDniAlreadyExistsError } from '@user/domain/exceptions/user.exceptions';

describe('Create Usecase test', () => {
    const repository = userRepositoryMock;
    let user: User;

    beforeEach( () => {
        user = generateFakeUser();
    });
    
    it('should create user from provided dto:', async () => {
        // Setup
        const createUserDto: ICreateUserDto = {
            dni: user.dni,
            firstname: user.firstname,
            lastname: user.lastname,
            birthdate: user.birthdate,
            email: user.email,
            phone: user.phone 
        };

        // returns null because user dni doesnt exist
        managerMock.commit.mockResolvedValue([null]);

        // Execution
        const result = await createUser(createUserDto, repository, managerMock);

        // Assertions
        if(!result.isSuccess) {return;}

        expect(result.isSuccess).toBeTruthy();
        expect(result.value).toBeDefined();
        expect(result.value).toMatchObject(createUserDto);
        expect(repository.create).toHaveBeenCalled();
        expect(managerMock.commit).toHaveBeenCalled();
    });

    it('should not create user from provided dto if dni already exist:', async () => {
        // Setup
        const createUserDto: ICreateUserDto = { ...user };

        // returns user because user dni already exist
        managerMock.commit.mockResolvedValue([user]);

        // Execution
        const result = await createUser(createUserDto, repository, managerMock);

        // Assertions
        if(result.isSuccess) {return;}

        expect(result.isSuccess).toBeFalsy();
        expect(result.error).toBeDefined();
        expect(result.error).toBeInstanceOf(UserDniAlreadyExistsError);
        expect(repository.create).toHaveBeenCalled();
        expect(managerMock.commit).toHaveBeenCalled();
    });
});