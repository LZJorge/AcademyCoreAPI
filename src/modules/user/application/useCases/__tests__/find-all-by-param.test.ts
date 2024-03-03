import { generateFakeUser } from '@tests/utils/mocks/user.fake';
import { userRepositoryMock } from '@user/domain/repository/mocks/user.repository.mock';
import { findAllUserByParam } from '@user/application/useCases/find-all-by-param';
import { FindAllByDto } from '@user/application/dto/find-all-by.dto';
import { CantSearchUserByInvalidParamError } from '@user/domain/exceptions/user.exceptions';
import { User } from '@user/domain/entity/user.entity';
import { mockReset } from 'jest-mock-extended';
import { managerMock } from '@shared/domain/repositories/mocks/transaction.manager.mock';

describe('Find all User by param Usecase test', () => {
    const repository = userRepositoryMock;
    let user: User;

    beforeEach( () => {
        user = generateFakeUser();
        
        mockReset(repository);
    });
    
    it('should find all users by some user param:', async () => {
        // Define Params
        let findAllByDto: FindAllByDto = { param: 'firstname', value: user.firstname };
        
        // Mock Responses
        managerMock.commit.mockResolvedValue([ [user] ]);
        
        // Execution
        let result = await findAllUserByParam(findAllByDto, repository, managerMock);
        
        // Assertions
        if(!result.isSuccess) {return;}

        expect(result.isSuccess).toBeTruthy();
        expect(result.value).toBeDefined();
        expect(result.value).toContain(user);

        // ----------------------------
        // Define Params
        findAllByDto = { param: 'lastname', value: user.lastname };
        
        // Execution
        result = await findAllUserByParam(findAllByDto, repository, managerMock);        expect(result).toBeDefined();
        
        // Assertions
        if(!result.isSuccess) {return;}

        expect(result.isSuccess).toBeTruthy();
        expect(result.value).toBeDefined();
        expect(result.value).toContain(user);

        // ----------------------------
        // Define Params
        findAllByDto = { param: 'email', value: user.email };
        
        // Execution
        result = await findAllUserByParam(findAllByDto, repository, managerMock);        expect(result).toBeDefined();
        
        // Assertions
        if(!result.isSuccess) {return;}

        expect(result.isSuccess).toBeTruthy();
        expect(result.value).toBeDefined();
        expect(result.value).toContain(user);

        // ----------------------------
        // Define Params
        findAllByDto = { param: 'phone', value: user.phone };
        
        // Execution
        result = await findAllUserByParam(findAllByDto, repository, managerMock);        expect(result).toBeDefined();
        
        // Assertions
        if(!result.isSuccess) {return;}

        expect(result.isSuccess).toBeTruthy();
        expect(result.value).toBeDefined();
        expect(result.value).toContain(user);
        expect(repository.findAllBy).toHaveBeenCalledTimes(4);
    });

    it('should not find users by invalid params:', async () => {
        // Define Params
        const findAllByDto: FindAllByDto = { param: 'invalid param' as keyof User, value: user.firstname };
        
        // Execution
        const result = await findAllUserByParam(findAllByDto, repository, managerMock);
        
        // Assertions
        if(result.isSuccess) {return;}

        expect(result.isSuccess).toBeFalsy();
        expect(result.error).toBeDefined();
        expect(result.error).toBeInstanceOf(CantSearchUserByInvalidParamError);
        expect(repository.findAllBy).toHaveBeenCalledTimes(0);
    });
});