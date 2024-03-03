import { generateFakeUser } from '@tests/utils/mocks/user.fake';
import { userRepositoryMock } from '@user/domain/repository/mocks/user.repository.mock';
import { findAllUser } from '@user/application/useCases/find-all';
import { User } from '@user/domain/entity/user.entity';
import { managerMock } from '@shared/domain/repositories/mocks/transaction.manager.mock';

describe('Find all Usecase test', () => {
    const repository = userRepositoryMock;
    let user: User;

    beforeEach( () => {
        user = generateFakeUser();
    });
    
    it('should find all users:', async () => {
        managerMock.commit.mockResolvedValue([ [user] ]);
        
        // Execution
        const result = await findAllUser(repository, managerMock);

        // Assertions
        if(!result.isSuccess) {return;}

        expect(result.isSuccess).toBeTruthy();
        expect(result.value).toBeDefined();
        expect(result.value).toContain(user);
        expect(repository.findAll).toHaveBeenCalled();
    });

    it('should return an empty array if no users found:', async () => {
        managerMock.commit.mockResolvedValueOnce([ [] ]);
        
        // Execution
        const result = await findAllUser(repository, managerMock);

        // Assertions
        if(!result.isSuccess) {return;}

        expect(result.isSuccess).toBeTruthy();
        expect(result.value).toBeDefined();
        expect(result.value).toHaveLength(0);
        expect(repository.findAll).toHaveBeenCalled();
    });
});