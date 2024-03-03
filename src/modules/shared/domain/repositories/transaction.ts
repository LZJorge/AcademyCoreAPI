import { Entity } from '@shared/domain/entities/base.entity';

/**
 * The Transaction class is designed to encapsulate a collection of operations
 * that are intended to be executed together as a single unit of work. This pattern
 * is known as the Unit of Work pattern and is crucial for maintaining queue integrity
 * and consistency, especially in the context of a queuebase or any storage system.
 * 
 * By using the Transaction class, we ensure that all operations within a transaction
 * either complete successfully or fail as a whole. If an error occurs during any of
 * the operations, the transaction can be rolled back to its initial state, thus
 * preventing partial updates that could lead to queue inconsistencies.
 * 
 * @method add - Adds an operation to the transaction queue
 * @method get - Returns the current queue of operations
 * @method clear - Provides a way to reset the transaction, removing all queued operations.
 *
 * The Transaction class provides a simple way to queue up operations within a transaction.
 * This class acts as a foundational block for implementing the Unit of Work pattern,
 * ensuring that the operations are atomic, consistent, isolated, and durable (ACID properties).
 */ 
export class Transaction {
    private queue: unknown[] = [];

    /**
     * only can add methods of the repositories and not awaiting them
     * 
     * @example
     * const transaction = new Transaction();
     * 
     * transaction.add(userRepository.create(user));
     * transaction.add(teacherRepository.findAll());
     */
    add<T extends Entity | Entity[]>(transaction: Promise<T | null>): void {
        this.queue.push(transaction);
    }

    get(): typeof this.queue {
        return this.queue;
    }

    clear(): void {
        this.queue = [];
    }
}