import { ICreateUserDto } from '@user/application/dto/create-user.dto';

export interface ICreateStudentDto {
    student_password: string;
    user: ICreateUserDto;
}