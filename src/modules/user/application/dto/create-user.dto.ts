/**
 * interface defines the structure of data required to create a user.
 */
export interface ICreateUserDto {
    dni: string;
    firstname: string;
    lastname: string;
    birthdate: Date;
    phone: string;
    email: string;
}
