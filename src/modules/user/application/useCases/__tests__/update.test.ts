import { mockReset } from 'jest-mock-extended';
import { generateFakeUser } from '@tests/utils/mocks/user.fake';
import { userRepositoryMock } from '@user/domain/repository/mocks/user.repository.mock';
import { IUpdateUserDto } from '@user/application/dto/update-user.dto';
import { findAndUpdateUser } from '@user/application/useCases/update';
import { User } from '@user/domain/entity/user.entity';
import { managerMock } from '@shared/domain/repositories/mocks/transaction.manager.mock';
import { UserNotFoundError } from '@user/domain/exceptions/user.exceptions';

describe('Update general info Usecase test', () => {
    const repository = userRepositoryMock;
    let user: User,
        newData: User;

    beforeEach( () => {
        user = generateFakeUser();
        newData = generateFakeUser();

        mockReset(repository);
        mockReset(managerMock);
    });
    
    it('should return updated user:', async () => {
        const updateUserDto: IUpdateUserDto = {
            firstname: newData.firstname,
            lastname: newData.lastname,
            birthdate: newData.birthdate,
            email: newData.email,
            phone: newData.phone
        };
        
        // Mocks
        managerMock.commit.mockResolvedValue([user]);

        // Execute
        const result = await findAndUpdateUser({ id: user.id, dto: updateUserDto }, repository, managerMock);
        
        // Assertions
        if(!result.isSuccess) {return;}

        expect(managerMock.commit).toHaveBeenCalled();
        expect(repository.update).toHaveBeenCalledWith({ ...user, ...updateUserDto });

        expect(result.isSuccess).toBeTruthy();
        expect(result.value).toBeDefined();
        expect(result.value).toMatchObject({ ...updateUserDto, id: user.id });
    });

    it('should not update user if dont exist user by provided id:', async () => {
        const updateUserDto: IUpdateUserDto = {
            firstname: newData.firstname,
            lastname: newData.lastname,
            birthdate: newData.birthdate,
            email: newData.email,
            phone: newData.phone
        };
        managerMock.commit.mockResolvedValueOnce([null]);

        // Execute
        const result = await findAndUpdateUser({ id: user.id, dto: updateUserDto }, repository, managerMock);
        
        // Assertions
        if(result.isSuccess) {return;}

        expect(managerMock.commit).toHaveBeenCalled();
        expect(repository.update).not.toHaveBeenCalled();

        expect(result.isSuccess).toBeFalsy();
        expect(result.error).toBeDefined();
        expect(result.error).toBeInstanceOf(UserNotFoundError);
    });
});