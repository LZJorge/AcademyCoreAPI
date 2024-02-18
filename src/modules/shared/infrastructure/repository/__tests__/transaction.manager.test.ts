import { mockReset } from 'jest-mock-extended';
import { prismaMock } from '@tests/lib/mocks/prisma.mock';
import { TransactionManager } from '@shared/infrastructure/repository/transaction.manager';

import { generateFakeUser, generateFakeStudent } from '@tests/utils/mocks/user.fake';

import { userRepositoryMock } from '@user/domain/repository/mocks/user.repository.mock';
import { studentRepositoryMock } from '@student/domain/repository/mocks/student.repository.mock';
import { Transaction } from '@shared/domain/repositories/transaction';

beforeEach( () => {
    mockReset(userRepositoryMock);
    mockReset(studentRepositoryMock);
});

/* Tests */
describe('Transaction Manager Test', () => {
    const client = prismaMock;
    const user = generateFakeUser();
    const student = generateFakeStudent();

    let manager: TransactionManager;

    beforeEach(() => {
        manager = new TransactionManager(client);
    });

    describe('Manager commit', () => {
        const query_1 = studentRepositoryMock.create(student);
        const query_2 = userRepositoryMock.create(user);
        const query_3 = userRepositoryMock.findOne(user.id);
        const query_4 = studentRepositoryMock.findOne(student.id);

        it('Should execute all queries in a transaction and rollback if any fails', async() => {
            client.$transaction.mockRejectedValueOnce(new Error())
            const transaction = new Transaction();
            transaction.add(query_1);
            transaction.add(query_2);
            transaction.add(query_4);

            /* Act */
            try {   
                await manager.commit(transaction);
            } catch (error) {} 

            /* Assert */
            expect(client.$transaction).toHaveBeenCalledTimes(1)
        });

        it('Should execute all queries in a transaction and commit if all succeed', async() => {
            client.$transaction.mockResolvedValueOnce([ student, user, user ])
            const transaction = new Transaction();
            transaction.add(query_1);
            transaction.add(query_2);
            transaction.add(query_3);

            /* Act */
            const queries = await manager.commit(transaction);

            /* Assert */
            expect(client.$transaction).toHaveBeenCalledTimes(1)

            expect(queries[0]).toEqual(student);
            expect(queries[1]).toEqual(user);
            expect(queries[2]).toEqual(user);
        });
    });
});