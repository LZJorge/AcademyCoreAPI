import { Result } from '@shared/domain/result/result';
import { Student } from '@student/domain/entity/student.entity';
import { StudentAlreadyRegisteredError } from '@student/domain/exceptions/student.exceptions';

export type CreateStudentResponse = Result<Student | null, StudentAlreadyRegisteredError>;