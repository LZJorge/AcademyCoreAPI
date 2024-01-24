import { User } from '@user/domain/entity/user.entity';
import { CreateUserDto, ICreateUserDto } from '@user/application/dto/create-user.dto';
import { IUserRepository } from '@user/domain/repository/user.repository';
import { generateUUID } from '@shared/infrastructure/helpers/id.helper';
import { CreateUserResponse } from '@user/application/responses/create-user';

export async function createUser(data: ICreateUserDto, ctx: IUserRepository): Promise<CreateUserResponse> {
    const dto = new CreateUserDto(data);
    const validationResult = await dto.validate();
    if(!validationResult.isSuccess) {
        return { isSuccess: false, error: validationResult.error };
    }
    const user: User = new User({
        ...data,
        id: generateUUID(),
        created_at: new Date(),
        updated_at: new Date()
    });
    return { isSuccess: true, value: await ctx.create(user) }; 
}