import { Request, Response } from 'express';
import { StudentService } from '@student/application/service/student.service';

/**
 * Schemas
 */
import { CreateUserSchema } from '@user/infrastructure/schema/create-user.schema';
import { UpdateUserSchema } from '@user/infrastructure/schema/update-user.schema';

import { HttpStatus } from '@shared/domain/exceptions/http.statusCodes';

export class StudentController {
    constructor(private readonly service: StudentService) {}

    /**
     * Create a new entity using the data from the request body.
     *
     * @param {Request} req - the request object
     * @param {Response} res - the response object
     * @return {Promise<Response>} the response from the create operation
     */
    async create(req: Request, res: Response): Promise<Response> {
        const { firstname, lastname, dni, email, birthdate, phone } = req.body;
        const data = { firstname, lastname, dni, email, birthdate, phone };

        const validation = await new CreateUserSchema().validate(data);
        if (!validation.isSuccess) {
            return res.status(validation.error.statusCode).json(validation);
        }

        const response = await this.service.create(data);
        if (!response.isSuccess) {
            return res.status(response.error.statusCode).json(response);
        }

        return res.status(HttpStatus.CREATED).json(response);
    }

    /**
     * Finds a entity based on the request and sends the response.
     *
     * @param {Request} req - The request object
     * @param {Response} res - The response object
     * @return {Promise<Response>} The response object
     */
    async findOneById(req: Request, res: Response): Promise<Response> {
        const response = await this.service.findOneById(req.params.id);
        if (!response.isSuccess) {
            return res.status(response.error.statusCode).json(response);
        }

        return res.status(HttpStatus.OK).json(response);
    }

    /**
     * Finds a entity based on the request and sends the response.
     *
     * @param {Request} req - The request object
     * @param {Response} res - The response object
     * @return {Promise<Response>} The response object
     */
    async findOneByDni(req: Request, res: Response): Promise<Response> {
        const response = await this.service.findOneByDni(req.params.dni);
        if (!response.isSuccess) {
            return res.status(response.error.statusCode).json(response);
        }

        return res.status(200).json(response);
    }

    /**
     * Finds many entities.
     *
     * @param {Request} req - the request object
     * @param {Response} res - the response object
     * @return {Promise<Response>} the response object
     */
    async findMany(req: Request, res: Response): Promise<Response> {
        return res.status(200).json(await this.service.findMany());
    }

    /**
     * Updates the request and response objects.
     *
     * @param {Request} req - the request object
     * @param {Response} res - the response object
     * @return {Promise<Response>} the response object
     */
    async updateUserInfo(req: Request, res: Response): Promise<Response> {
        const { firstname, lastname, email, birthdate, phone } = req.body;
        const data = { firstname, lastname, email, birthdate, phone };

        const validation = await new UpdateUserSchema().validate(data);
        if (!validation.isSuccess) {
            return res.status(validation.error.statusCode).json(validation);
        }

        return res.status(200).json();
    }

    /**
     * Delete a resource.
     *
     * @param {Request} req - the request object
     * @param {Response} res - the response object
     * @return {Promise<Response>} the response object
     */
    async delete(req: Request, res: Response): Promise<Response> {
        return res.status(200).json();
    }
}