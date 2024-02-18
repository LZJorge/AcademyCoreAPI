import { Result } from '@shared/domain/result/result';
import { Student } from '@student/domain/entity/student.entity';
import { CantSearchUserByInvalidParamError } from '@user/domain/exceptions/user.exceptions';

export type FindManyStudentsResponse = Result<Student[], CantSearchUserByInvalidParamError>;
