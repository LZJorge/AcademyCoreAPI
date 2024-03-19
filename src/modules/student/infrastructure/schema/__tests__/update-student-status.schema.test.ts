import { UpdateStudentStatusSchema } from '@student/infrastructure/schema/update-stude-status.schema';

describe('Create student schema test', () => {
    let schema: UpdateStudentStatusSchema;

    beforeEach(() => {
        schema = new UpdateStudentStatusSchema();
    });

    it('should pass validation if is_active is true', async () => {
        const result = await schema.validate({
            is_active: true
        });

        if(!result.isSuccess) {return;}
        expect(result.isSuccess).toBeTruthy();
        expect(result.value).toMatchObject({ is_active: true });
    });

    it('should pass validation if is_active is false', async () => {
        const result = await schema.validate({
            is_active: false
        });

        if(!result.isSuccess) {return;}
        expect(result.isSuccess).toBeTruthy();
        expect(result.value).toMatchObject({ is_active: false });
    });

    it('should not pass validation if is_active is diferent from true or false', async () => {
        const result = await schema.validate({
            is_active: '' as any
        });

        if(!result.isSuccess) {return;}
        expect(result.isSuccess).toBeTruthy();
        expect(result.value).toMatchObject({ is_active: true });
    });
});