import { IUserRepository } from '@user/domain/repository/user.repository';
import { UserNotFoundError } from '@user/domain/exceptions/user.exceptions';
import { FindOneUserResponse } from '@user/application/responses/find-one-user';
export async function findOneUserByDni(dni: string, ctx: IUserRepository): Promise<FindOneUserResponse> {
    const user = await ctx.findByDni(dni);
    if(!user) {
        return { isSuccess: false, error: new UserNotFoundError('dni', dni) };
    }
    return { isSuccess: true, value: user };
}