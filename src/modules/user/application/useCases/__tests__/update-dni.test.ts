import { generateFakeUser } from '@tests/utils/mocks/user.fake';
import { userRepositoryMock } from '@user/domain/repository/mocks/user.repository.mock';
import { IDniDto } from '@user/application/dto/dni.dto';
import { findAndUpdateUserDNI } from '@user/application/useCases/update-dni';
import { managerMock } from '@shared/domain/repositories/mocks/transaction.manager.mock';
import { User } from '@user/domain/entity/user.entity';

describe('Update dni Usecase test', () => {
    const repository = userRepositoryMock;
    let user: User,
        newData: User;

    beforeEach( () => {
        user = generateFakeUser();
        newData = generateFakeUser();
    });
    
    it('should return updated dni user:', async () => {
        const dto: IDniDto = { dni: newData.dni };
        
        managerMock.commit.mockResolvedValueOnce([user]);
        
        const result = await findAndUpdateUserDNI({ id: user.id, dto }, repository, managerMock);
        
        if(!result.isSuccess) {return;}
        expect(result.isSuccess).toBeTruthy();
        expect(result.value).toBeDefined();
        expect(result.value).toMatchObject({ ...dto, id: user.id });
        expect(repository.updateDni).toHaveBeenCalled();
    });
});