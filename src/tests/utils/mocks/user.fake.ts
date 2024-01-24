import { faker } from '@faker-js/faker';
import { User } from '@user/domain/entity/user.entity';
import { userValues } from '@user/domain/values/user.values';
function generateDni(): string {
    const index = Math.floor(Math.random() * userValues.dni.types.length);
    return userValues.dni.types[index] + '-' + faker.string.numeric({ length: userValues.dni.digits });
}
function generatePhoneNumber(): string {
    const index = Math.floor(Math.random() * userValues.phone.operators.length);
    return userValues.phone.operators[index] + '-' + faker.string.numeric({ length: userValues.phone.digits });
}
export function generateFakeUser(): User {
    return new User({
        id: faker.string.uuid(),
        dni: generateDni(),
        firstname: faker.person.firstName(),
        lastname: faker.person.lastName(),
        birthdate: faker.date.birthdate(),
        email: faker.internet.email(),
        phone: generatePhoneNumber(),
        created_at: faker.date.past(),
        updated_at: faker.date.recent()
    });
}
export function generateManyFakeUser(amount: number): User[] {
    const users: User[] = [];
    for(let i = 1; i <= amount; i++) {
        users.push(generateFakeUser());
    }
    return users;
}