/**
 * interface defines the structure of data required to update a user.
 */
export class IUpdateUserDto {
    firstname: string;
    lastname: string;
    birthdate: Date;
    phone: string;
    email: string;
}