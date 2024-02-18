import { Result } from '@shared/domain/result/result';
import { Student } from '@student/domain/entity/student.entity';
import { StudentNotFoundError } from '@student/domain/exceptions/student-not-found.exception';

export type FindOneStudentResponse = Result<Student, StudentNotFoundError>;