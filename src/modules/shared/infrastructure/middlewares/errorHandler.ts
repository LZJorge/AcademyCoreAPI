import { Request, Response, NextFunction } from 'express';
import { BaseError } from '@shared/domain/exceptions/base.exception';

export function errorHandler(err: unknown, req: Request, res: Response, next: NextFunction): void {
    if(err instanceof BaseError) {
        res.status(err.statusCode).json({
            name: err.name,
            message: err.message,
            status: err.statusCode,
            info: { 
                ...err.data 
            }
        });
    }
    next();
}