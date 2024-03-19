import { hash, compare } from 'bcrypt';

const SALT = 10;

export class Password {
    static async hash(password: string): Promise<string> {
        return await hash(password, SALT);
    }

    static async compare(password: string, hashedPassword: string): Promise<boolean> {
        return await compare(password, hashedPassword);
    }
}