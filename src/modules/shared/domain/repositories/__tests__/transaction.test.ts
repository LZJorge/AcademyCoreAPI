import { mock } from 'jest-mock-extended';
import { Transaction } from '@shared/domain/repositories/transaction';
import { Repository } from '@shared/domain/repositories/base.repository';
import { Entity } from '@shared/domain/entities/base.entity';

describe('Transaction test', () => {
    const repository = mock<Repository<Entity>>();
    let transaction: Transaction;

    beforeEach(() => {
        transaction = new Transaction();
    });

    it('should add an operation to the transaction queue', () => {
        transaction.add(repository.findOne('1'));
        transaction.add(repository.findAll());
        transaction.add(repository.create({} as Entity));

        expect(transaction.get()).toEqual([
            repository.findOne('1'),
            repository.findAll(),
            repository.create({} as Entity),
        ]);
    });

    it('should return the transaction queue', () => {
        transaction.add(repository.findOne('1'));
        transaction.add(repository.findOne('2'));

        const queue = transaction.get();

        expect(queue).toEqual([
            repository.findOne('1'), 
            repository.findOne('2')
        ]);
    });

    it('should return an empty array if there are no operations', () => {
        expect(transaction.get()).toEqual([]);
    });    

    it('should clear the transaction queue', () => {
        transaction.add(repository.findOne('1'));
        transaction.add(repository.findOne('2'));
        transaction.clear();

        expect(transaction.get()).toEqual([]);
    });
});