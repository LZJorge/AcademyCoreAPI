import { EntityValidationError } from '@shared/domain/exceptions/entity.validation.exception';
import { generateFakeUser } from '@tests/utils/mocks/user.fake';
import { IDniDto } from '@user/application/dto/dni.dto';
import { DniSchema } from '@user/infrastructure/schema/dni.schema';

describe('Create user schema test', () => {
    const dni: IDniDto = { dni: generateFakeUser().dni };
    let schema: DniSchema;

    beforeEach(() => {
        schema = new DniSchema();
    });

    it('should validate dni schema', async () => {
        const result = await schema.validate(dni);

        if(!result.isSuccess) {return;}
        expect(result.isSuccess).toBeTruthy();
        expect(result.value).toMatchObject(dni);
    });

    it('should not pass if dni is invalid', async () => {
        const result = await schema.validate({
            dni: 'XXX'
        });

        if(result.isSuccess) {return;}
        expect(result.isSuccess).toBeFalsy();
        expect(result.error).toBeDefined();
        expect(result.error).toBeInstanceOf(EntityValidationError);
    });    
});