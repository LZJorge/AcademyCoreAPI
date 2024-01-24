import { FindAllByDto } from '@user/application/dto/find-all-by.dto';
import { IUserRepository } from '@user/domain/repository/user.repository';
import { FindManyUserResponse } from '@user/application/responses/find-many-user';
import { canSearchUserByParam } from '@user/domain/values/canSearchUserBy';
import { CantSearchUserByInvalidParamError } from '@user/domain/exceptions/user.exceptions';
export async function findAllUserByParam(dto: FindAllByDto, ctx: IUserRepository): Promise<FindManyUserResponse> {
    if(!canSearchUserByParam(dto.param)) {
        return { isSuccess: false, error: new CantSearchUserByInvalidParamError(dto.param, dto.value) };
    }
    return { isSuccess: true, value: await ctx.findAllBy(dto.param, dto.value) };
}