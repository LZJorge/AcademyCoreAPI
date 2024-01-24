import { User } from '@user/domain/entity/user.entity';
import { IUserRepository } from '@user/domain/repository/user.repository';
import { DniDto, IDniDto } from '@user/application/dto/dni.dto';
import { UserNotFoundError } from '@user/domain/exceptions/user.exceptions';
import { UpdateUserResponse } from '@user/application/responses/update-user';

export async function updateUserDNI(id: string, dto: IDniDto, ctx: IUserRepository): Promise<UpdateUserResponse> {
    const data = new DniDto(dto);

    const validationResult = await data.validate();
    if(!validationResult.isSuccess) {
        return { isSuccess: false, error: validationResult.error };
    }

    const current = await ctx.findOne(id);
    if(!current) {
        return { isSuccess: false, error: new UserNotFoundError('id', id) };
    }
    
    const update: User = { ...current, dni: dto.dni, id, updated_at: new Date() };
    return { isSuccess: true, value: await ctx.updateDni(update) };
}