import { CreateUserDto, ICreateUserDto } from '@user/application/dto/create-user.dto';
import { generateFakeUser } from '@tests/utils/mocks/user.fake';
import { EntityValidationError } from '@shared/domain/exceptions/entity.validation.exception';

describe('Create User Dto test', () => {
    const user = generateFakeUser();
    const partial: ICreateUserDto = { ...user };

    it('should pass if all properties are validated successfully', async () => {
        const dto = new CreateUserDto(partial);
        const result = await dto.validate();
        expect(result.isSuccess).toBeTruthy();
        if(!result.isSuccess) {
            throw new Error('Test failed');
        }
        expect(result.value).toMatchObject(dto.data);
    });

    it('should not pass if some property are invalid', async () => {
        const dto = new CreateUserDto({ ...partial, firstname: '', dni: ''});
        const result = await dto.validate();
        expect(result.isSuccess).toBeFalsy();
        if(result.isSuccess) {
            throw new Error('Test failed');
        }
        expect(result.error).toBeInstanceOf(EntityValidationError);
    });
});