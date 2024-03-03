import { generateFakeUser } from '@tests/utils/mocks/user.fake';
import { userRepositoryMock } from '@user/domain/repository/mocks/user.repository.mock';
import { findOneUserById } from '@user/application/useCases/find-one-by-id';
import { UserNotFoundError } from '@user/domain/exceptions/user.exceptions';
import { User } from '@user/domain/entity/user.entity';
import { managerMock } from '@shared/domain/repositories/mocks/transaction.manager.mock';

describe('Find one user by id Usecase test', () => {
    const repository = userRepositoryMock;
    let user: User;

    beforeEach( () => {
        user = generateFakeUser();
    });
    
    it('should find one user by his id:', async () => {
        managerMock.commit.mockResolvedValueOnce([user]);
        const result = await findOneUserById(user.id, repository, managerMock);
        expect(result.isSuccess).toBeTruthy();
        if(!result.isSuccess) {return;}
        expect(result.value).toBeDefined();
        expect(result.value).toMatchObject(user);
        expect(repository.findOne).toHaveBeenCalled();
    });

    it('should not find user if dont exist user by provided id:', async () => {
        managerMock.commit.mockResolvedValueOnce([null]);
        const result = await findOneUserById('Wrong id', repository, managerMock);
        expect(result.isSuccess).toBeFalsy();
        if(result.isSuccess) {return;}
        expect(result.error).toBeDefined();
        expect(result.error.data).toBeDefined();
        expect(result.error).toBeInstanceOf(UserNotFoundError);
        expect(repository.findOne).toHaveBeenCalled();
    });
});