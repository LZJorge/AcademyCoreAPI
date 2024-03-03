import { generateFakeUser } from '@tests/utils/mocks/user.fake';
import { userRepositoryMock } from '@user/domain/repository/mocks/user.repository.mock';
import { findOneUserByDni } from '@user/application/useCases/find-one-by-dni';
import { UserNotFoundError } from '@user/domain/exceptions/user.exceptions';
import { User } from '@user/domain/entity/user.entity';
import { managerMock } from '@shared/domain/repositories/mocks/transaction.manager.mock';

describe('Find one by dni Usecase test', () => {
    const repository = userRepositoryMock;
    let user: User;

    beforeEach( () => {
        user = generateFakeUser();
    });
    
    it('should find one user by his dni:', async () => {
        managerMock.commit.mockResolvedValue([user]);
        const result = await findOneUserByDni(user.dni, repository, managerMock);
        expect(result.isSuccess).toBeTruthy();
        if(!result.isSuccess) {return;}
        expect(result.value).toBeDefined();
        expect(result.value).toMatchObject(user);
        expect(repository.findByDni).toHaveBeenCalled();
    });

    it('should not find user if dont exist user by provided dni', async () => {
        managerMock.commit.mockResolvedValue([null]);
        const result = await findOneUserByDni('X-123456', repository, managerMock);
        expect(result.isSuccess).toBeFalsy();
        if(result.isSuccess) {return;}
        expect(result.error).toBeDefined();
        expect(result.error).toBeInstanceOf(UserNotFoundError);
        expect(repository.findByDni).toHaveBeenCalled();
    });
});