import { faker } from '@faker-js/faker';
import { User } from '@user/domain/entity/user.entity';
import { userValues } from '@user/domain/values/user.values';
import { Student } from '@student/domain/entity/student.entity';

/**
 * Creates Fake User
 */
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
        firstname: faker.helpers.fromRegExp('[A-Za-záéíóúñÁÉÍÓÚ]{3,64}'),
        lastname: faker.helpers.fromRegExp('[A-Za-záéíóúñÁÉÍÓÚ]{3,64}'),
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

/**
 * Creates Fake Student with his user
 */
export function generateFakeStudent(): Required<Student> {
    const user = generateFakeUser();

    return new Student({
        id: faker.string.uuid(),
        courses_completed: faker.number.int({ min: 0, max: 12 }),
        is_active: faker.datatype.boolean(),
        user_id: user.id,
        user
    }) as Required<Student>;
}
export function generateManyFakeStudent(amount: number): Required<Student>[] {
    const students: Required<Student>[] = [];
    for(let i = 1; i <= amount; i++) {
        students.push(generateFakeStudent());
    }
    return students;
}