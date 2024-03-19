import { EntityValidationError } from '@shared/domain/exceptions/entity.validation.exception';
import { CreateStudentSchema } from '@student/infrastructure/schema/create-student.schema';
import { generateFakePassword, generateFakeUser } from '@tests/utils/mocks/user.fake';
import { ICreateStudentDto } from '@student/application/dto/create-student.dto';

describe('Create student schema test', () => {
    const student: ICreateStudentDto = {
        student_password: generateFakePassword(),
        user: generateFakeUser()
    };
    let schema: CreateStudentSchema;

    beforeEach(() => {
        schema = new CreateStudentSchema();
    });

    it('should validate create student schema', async () => {
        const result = await schema.validate(student);

        if(!result.isSuccess) {return;}
        expect(result.isSuccess).toBeTruthy();
        expect(result.value).toMatchObject(student);
    });

    it('should not pass if dni is invalid', async () => {
        const result = await schema.validate({
            student_password: student.student_password,
            user: { 
                ...student.user,
                dni: 'X'
            }
        });

        if(result.isSuccess) {return;}
        expect(result.isSuccess).toBeFalsy();
        expect(result.error).toBeDefined();
        expect(result.error).toBeInstanceOf(EntityValidationError);
    });

    it('should not pass if password is invalid', async () => {
        const result = await schema.validate({
            student_password: 'X',
            user: { 
                ...student.user,
            }
        });

        if(result.isSuccess) {return;}
        expect(result.isSuccess).toBeFalsy();
        expect(result.error).toBeDefined();
        expect(result.error).toBeInstanceOf(EntityValidationError);
    });

    it('should not pass if firstname is invalid', async () => {
        const result = await schema.validate({
            student_password: student.student_password,
            user: { 
                ...student.user,
                firstname: 'X'
            }
        });

        if(result.isSuccess) {return;}
        expect(result.isSuccess).toBeFalsy();
        expect(result.error).toBeDefined();
        expect(result.error).toBeInstanceOf(EntityValidationError);
    });

    it('should not pass if lastname is invalid', async () => {
        const result = await schema.validate({
            student_password: student.student_password,
            user: { 
                ...student.user,
                lastname: 'X'
            }
        });

        if(result.isSuccess) {return;}
        expect(result.isSuccess).toBeFalsy();
        expect(result.error).toBeDefined();
        expect(result.error).toBeInstanceOf(EntityValidationError);
    });

    it('should not pass if birthdate is invalid', async () => {
        const result = await schema.validate({
            student_password: student.student_password,
            user: { 
                ...student.user,
                birthdate: 'X' as any
            }
        });

        if(result.isSuccess) {return;}
        expect(result.isSuccess).toBeFalsy();
        expect(result.error).toBeDefined();
        expect(result.error).toBeInstanceOf(EntityValidationError);
    });

    it('should not pass if phone is invalid', async () => {
        const result = await schema.validate({
            student_password: student.student_password,
            user: { 
                ...student.user,
                phone: 'X'
            }
        });

        if(result.isSuccess) {return;}
        expect(result.isSuccess).toBeFalsy();
        expect(result.error).toBeDefined();
        expect(result.error).toBeInstanceOf(EntityValidationError);
    });

    it('should not pass if email is invalid', async () => {
        const result = await schema.validate({
            student_password: student.student_password,
            user: { 
                ...student.user,
                email: 'X'
            }
        });

        if(result.isSuccess) {return;}
        expect(result.isSuccess).toBeFalsy();
        expect(result.error).toBeDefined();
        expect(result.error).toBeInstanceOf(EntityValidationError);
    });
});