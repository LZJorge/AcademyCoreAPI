import { BaseError } from '@shared/domain/exceptions/base.exception';
export interface Success<T> {
    isSuccess: true;
    value: T;
}
export interface Failure<E extends BaseError | Array<unknown>> {
    isSuccess: false;
    error: E;
}
export type Result<T, E extends BaseError | Array<unknown> = never> = Success<T> | Failure<E>;