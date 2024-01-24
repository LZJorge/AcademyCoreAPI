import { Result } from '@shared/domain/result/result';
import { User } from '@user/domain/entity/user.entity';
import { EntityValidationError } from '@shared/domain/exceptions/entity.validation.exception';

export type CreateUserResponse = Result<User | null, EntityValidationError>;