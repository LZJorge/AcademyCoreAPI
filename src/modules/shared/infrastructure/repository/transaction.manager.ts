import { PrismaPromise, PrismaClient } from '@prisma/client';
import { Entity } from '@shared/domain/entities/base.entity';
import { Transaction } from '@shared/domain/repositories/transaction';
import { ITransactionManager } from '@shared/domain/repositories/transaction.manager';

export class TransactionManager implements ITransactionManager {
    constructor(private readonly client: PrismaClient) {}

    /**
     * This is a Script function that commits one or more transactions to a database using the Prisma ORM. 
     * this function provides a convenient way to commit multiple database transactions as a single unit of work, ensuring that either all of the transactions are committed or none of them are.
     *
     * @type
     * T represents an entity type (e.g., User | Teacher). It must extend the `Entity`.
     * 
     * Type T allows you to infer the return type of your query based on the provided argument.
     * 
     * @example
     * // *Returns a created user and an array of teachers
     * // *The order of the transactions means!!
     * const transaction = new Transaction();
     * transaction.add(userRepository.create(user));
     * transaction.add(teacherRepository.findAll());
     * 
     * const result = await manager.commit<(User | Teacher[])>(transaction);
     * 
     * return result; // [{...user}, [{ ...someTeacher }, {...someTeacher}]]
     */
    async commit<T extends Entity | Entity[]>(transaction: Transaction): Promise<T[]> {
        await this.client.$connect();

        const transactions = transaction.get();
        const result = await this.client.$transaction([
            ...transactions as PrismaPromise<T>[]
        ]);

        await this.client.$disconnect();

        transaction.clear();

        return result;
    }
}