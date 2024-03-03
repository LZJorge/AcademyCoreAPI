import { BaseError } from '@shared/domain/exceptions/base.exception';
export interface Success<T> {
    isSuccess: true;
    value: T;
}
export interface Failure<E extends BaseError> {
    isSuccess: false;
    error: E;
}
export type Result<T, E extends BaseError = never> = Success<T> | Failure<E>;