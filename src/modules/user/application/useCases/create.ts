import { CreateUserDto, ICreateUserDto } from '@user/application/dto/create-user.dto';
import { IUserRepository } from '@user/domain/repository/user.repository';
import { CreateUserResponse } from '@user/application/responses/create-user';
import { UserFactory } from '@user/application/factory/user.factory';

export async function createUser(data: ICreateUserDto, ctx: IUserRepository): Promise<CreateUserResponse> {
    const dto = new CreateUserDto(data);
    const validationResult = await dto.validate();
    if(!validationResult.isSuccess) {
        return { isSuccess: false, error: validationResult.error };
    }
    const user = UserFactory.create(data);
    return { isSuccess: true, value: await ctx.create(user) }; 
}