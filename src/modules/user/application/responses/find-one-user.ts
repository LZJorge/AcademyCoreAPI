import { Result } from '@shared/domain/result/result';
import { User } from '@user/domain/entity/user.entity';
import { UserNotFoundError } from '@user/domain/exceptions/user.exceptions';

export type FindOneUserResponse = Result<User, UserNotFoundError>;