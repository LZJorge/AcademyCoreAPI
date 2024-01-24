import { IUserRepository } from '@user/domain/repository/user.repository';
import { FindManyUserResponse } from '@user/application/responses/find-many-user';
export async function findAllUser(ctx: IUserRepository): Promise<FindManyUserResponse> {
    return { isSuccess: true, value: await ctx.findAll() };
}