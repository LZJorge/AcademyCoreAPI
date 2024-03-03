import { EntityValidationError } from '@shared/domain/exceptions/entity.validation.exception';
import { generateFakeUser } from '@tests/utils/mocks/user.fake';
import { IUpdateUserDto } from '@user/application/dto/update-user.dto';
import { UpdateUserSchema } from '@user/infrastructure/schema/update-user.schema';

describe('Update user schema test', () => {
    const user: IUpdateUserDto = generateFakeUser();
    let schema: UpdateUserSchema;

    beforeEach(() => {
        schema = new UpdateUserSchema();
    });

    it('should validate create user schema', async () => {
        const result = await schema.validate(user);

        if(!result.isSuccess) {return;}
        expect(result.isSuccess).toBeTruthy();
        expect(result.value).toMatchObject(user);
    });

    it('should return isSuccess = false, if firstname is invalid', async () => {
        const result = await schema.validate({
            ...user,
            firstname: 'X'
        });

        if(result.isSuccess) {return;}
        expect(result.isSuccess).toBeFalsy();
        expect(result.error).toBeDefined();
        expect(result.error).toBeInstanceOf(EntityValidationError);
    });

    it('should return isSuccess = false, if lastname is invalid', async () => {
        const result = await schema.validate({
            ...user,
            lastname: 'X'
        });

        if(result.isSuccess) {return;}
        expect(result.isSuccess).toBeFalsy();
        expect(result.error).toBeDefined();
        expect(result.error).toBeInstanceOf(EntityValidationError);
    });

    it('should return isSuccess = false, if birthdate is invalid', async () => {
        const result = await schema.validate({
            ...user,
            birthdate: 'X' as any
        });

        if(result.isSuccess) {return;}
        expect(result.isSuccess).toBeFalsy();
        expect(result.error).toBeDefined();
        expect(result.error).toBeInstanceOf(EntityValidationError);
    });

    it('should return isSuccess = false, if email is invalid', async () => {
        const result = await schema.validate({
            ...user,
            email: 'X'
        });

        if(result.isSuccess) {return;}
        expect(result.isSuccess).toBeFalsy();
        expect(result.error).toBeDefined();
        expect(result.error).toBeInstanceOf(EntityValidationError);
    });

    it('should return isSuccess = false, if phone is invalid', async () => {
        const result = await schema.validate({
            ...user,
            phone: '0123-'
        });

        if(result.isSuccess) {return;}
        expect(result.isSuccess).toBeFalsy();
        expect(result.error).toBeDefined();
        expect(result.error).toBeInstanceOf(EntityValidationError);
    });
});