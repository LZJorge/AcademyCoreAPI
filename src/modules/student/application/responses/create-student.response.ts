import { EntityValidationError } from '@shared/domain/exceptions/entity.validation.exception';
import { Result } from '@shared/domain/result/result';
import { Student } from '@student/domain/entity/student.entity';

export type CreateStudentResponse = Result<Student | null, EntityValidationError>;