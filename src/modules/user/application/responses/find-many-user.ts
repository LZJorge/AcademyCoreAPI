import { Result } from '@shared/domain/result/result';
import { User } from '@user/domain/entity/user.entity';
import { CantSearchUserByInvalidParamError } from '@user/domain/exceptions/user.exceptions';

export type FindManyUserResponse = Result<User[], CantSearchUserByInvalidParamError>;