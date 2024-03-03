import { EntityValidationError } from '@shared/domain/exceptions/entity.validation.exception';
import { generateFakeUser } from '@tests/utils/mocks/user.fake';
import { ICreateUserDto } from '@user/application/dto/create-user.dto';
import { CreateUserSchema } from '@user/infrastructure/schema/create-user.schema';

describe('Create user schema test', () => {
    const user: ICreateUserDto = generateFakeUser();
    let schema: CreateUserSchema;

    beforeEach(() => {
        schema = new CreateUserSchema();
    });

    it('should validate create user schema', async () => {
        const result = await schema.validate(user);

        if(!result.isSuccess) {return;}
        expect(result.isSuccess).toBeTruthy();
        expect(result.value).toMatchObject(user);
    });

    it('should return isSuccess = false, if dni is invalid', async () => {
        const result = await schema.validate({
            ...user,
            dni: 'XXX'
        });

        if(result.isSuccess) {return;}
        expect(result.isSuccess).toBeFalsy();
        expect(result.error).toBeDefined();
        expect(result.error).toBeInstanceOf(EntityValidationError);
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