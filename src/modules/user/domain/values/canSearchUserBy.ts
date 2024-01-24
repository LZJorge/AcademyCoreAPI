import { User } from '@user/domain/entity/user.entity';

export const userSearchParams: Array<keyof User> = [
    'id',
    'dni',
    'firstname', 
    'lastname', 
    'email',
    'phone', 
    'created_at'
];

export function canSearchUserByParam(param: string): boolean {
    return userSearchParams.includes(param as keyof User);
}