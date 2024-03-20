import { mockReset } from 'jest-mock-extended';
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

        mockReset(repository);
    });
    
    it('should find one user by his dni:', async () => {
        managerMock.commit.mockResolvedValue([user]);

        // Execution
        const result = await findOneUserByDni(user.dni, repository, managerMock);

        // Assertions
        if(!result.isSuccess) {return;}

        expect(managerMock.commit).toHaveBeenCalled();
        expect(repository.findByDni).toHaveBeenCalled();

        expect(result.isSuccess).toBeTruthy();
        expect(result.value).toBeDefined();
        expect(result.value).toMatchObject(user);
    });

    it('should not find user if dont exist user by provided dni', async () => {
        managerMock.commit.mockResolvedValue([null]);

        // Execution
        const result = await findOneUserByDni('X-123456', repository, managerMock);

        // Assertions
        if(result.isSuccess) {return;}

        expect(managerMock.commit).toHaveBeenCalled();
        expect(repository.findByDni).toHaveBeenCalled();

        expect(result.isSuccess).toBeFalsy();
        expect(result.error).toBeDefined();
        expect(result.error).toBeInstanceOf(UserNotFoundError);
    });
});