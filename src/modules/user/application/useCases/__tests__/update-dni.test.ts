import { mockReset } from 'jest-mock-extended';
import { generateFakeUser } from '@tests/utils/mocks/user.fake';
import { userRepositoryMock } from '@user/domain/repository/mocks/user.repository.mock';
import { IDniDto } from '@user/application/dto/dni.dto';
import { findAndUpdateUserDNI } from '@user/application/useCases/update-dni';
import { managerMock } from '@shared/domain/repositories/mocks/transaction.manager.mock';
import { User } from '@user/domain/entity/user.entity';
import { UserNotFoundError } from '@user/domain/exceptions/user.exceptions';

describe('Update dni Usecase test', () => {
    const repository = userRepositoryMock;
    let user: User,
        newData: User;

    beforeEach( () => {
        user = generateFakeUser();
        newData = generateFakeUser();

        mockReset(repository);
        mockReset(managerMock);
    });
    
    it('should return updated dni user:', async () => {
        const dto: IDniDto = { dni: newData.dni };
        managerMock.commit.mockResolvedValueOnce([user]);
        
        // Execute
        const result = await findAndUpdateUserDNI({ id: user.id, dto }, repository, managerMock);
        
        // Assertions
        if(!result.isSuccess) {return;}

        expect(managerMock.commit).toHaveBeenCalled();
        expect(repository.updateDni).toHaveBeenCalledWith({ ...user, ...dto });

        expect(result.isSuccess).toBeTruthy();
        expect(result.value).toBeDefined();
        expect(result.value).toMatchObject({ ...dto, id: user.id });
    });

    it('should not update dni if dont exist user by provided id:', async () => {
        const dto: IDniDto = { dni: newData.dni };
        managerMock.commit.mockResolvedValueOnce([null]);

        // Execute
        const result = await findAndUpdateUserDNI({ id: user.id, dto }, repository, managerMock);
        
        // Assertions
        if(result.isSuccess) {return;}

        expect(managerMock.commit).toHaveBeenCalled();
        expect(repository.updateDni).not.toHaveBeenCalled();

        expect(result.isSuccess).toBeFalsy();
        expect(result.error).toBeDefined();
        expect(result.error).toBeInstanceOf(UserNotFoundError);
    });
});