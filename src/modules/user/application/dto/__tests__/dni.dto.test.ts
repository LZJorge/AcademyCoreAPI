import { DniDto, IDniDto } from '@user/application/dto/dni.dto';
import { generateFakeUser } from '@tests/utils/mocks/user.fake';
import { userValues } from '@user/domain/values/user.values';
import { EntityValidationError } from '@shared/domain/exceptions/entity.validation.exception';

describe('Create User Dto test', () => {
    const user = generateFakeUser();
    const partial: IDniDto = { ...user };

    it('should pass if dni are valid', async () => {
        const areValid = userValues.dni.regex.test(partial.dni);
        const dto = new DniDto({ dni: partial.dni });
        const result = await dto.validate();
        expect(result.isSuccess).toBeTruthy();
        expect(areValid).toBeTruthy();
        if(!result.isSuccess) {
            throw new Error('Test failed');
        }
        expect(result.value).toMatchObject(dto.data);
    });

    it('should not pass if dni are invalid', async () => {
        const invalidDNI = 'X-1zcxv2345678';
        const areValid = userValues.dni.regex.test(invalidDNI);
        const dto = new DniDto({ dni: invalidDNI });
        const result = await dto.validate();
        expect(result.isSuccess).toBeFalsy();
        expect(areValid).toBeFalsy();
        if(result.isSuccess) {
            throw new Error('Test failed');
        }
        expect(result.error).toBeInstanceOf(EntityValidationError);
    });
});