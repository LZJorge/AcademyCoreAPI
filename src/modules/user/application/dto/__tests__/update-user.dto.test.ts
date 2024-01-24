import { UpdateUserDto, IUpdateUserDto } from '@user/application/dto/update-user.dto';
import { generateFakeUser } from '@tests/utils/mocks/user.fake';
import { EntityValidationError } from '@shared/domain/exceptions/entity.validation.exception';

describe('Update User Dto test', () => {
    const user = generateFakeUser();
    const partial: IUpdateUserDto = { ...user };

    it('should pass if all properties are validated successfully', async () => {
        const dto = new UpdateUserDto(partial);
        const result = await dto.validate();
        expect(result.isSuccess).toBeTruthy();
        if(!result.isSuccess) {
            throw new Error('Test failed');
        }
        expect(result.value).toMatchObject(dto.data);
    });

    it('should not pass if some property are invalid', async () => {
        const dto = new UpdateUserDto({ ...partial, firstname: '', lastname: ''});
        const result = await dto.validate();
        expect(result.isSuccess).toBeFalsy();
        if(result.isSuccess) {
            throw new Error('Test failed');
        }
        expect(result.error).toBeInstanceOf(EntityValidationError);
    });
});