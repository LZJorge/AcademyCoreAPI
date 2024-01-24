import { Result } from '@shared/domain/result/result';
import { User } from '@user/domain/entity/user.entity';
import { EntityValidationError } from '@shared/domain/exceptions/entity.validation.exception';
import { UserNotFoundError } from '@user/domain/exceptions/user.exceptions';

export type UpdateUserResponse = Result<User | null, EntityValidationError | UserNotFoundError>;