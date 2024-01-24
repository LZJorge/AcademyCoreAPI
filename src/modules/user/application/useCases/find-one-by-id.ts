import { IUserRepository } from '@user/domain/repository/user.repository';
import { UserNotFoundError } from '@user/domain/exceptions/user.exceptions';
import { FindOneUserResponse } from '@user/application/responses/find-one-user';

export async function findOneUserById(id: string, ctx: IUserRepository): Promise<FindOneUserResponse> {
    const user = await ctx.findOne(id);
    if(!user) {
        return { isSuccess: false, error: new UserNotFoundError('id', id) };
    }
    return { isSuccess: true, value: user };
}