import { Request, Response } from 'express';
import { StudentService } from '@student/application/service/student.service';

/**
 * Schemas
 */
import { CreateStudentSchema } from '@student/infrastructure/schema/create-student.schema';
import { UpdateUserSchema } from '@user/infrastructure/schema/update-user.schema';

import { HttpStatus } from '@shared/domain/exceptions/http.statusCodes';
import { UpdateStudentStatusSchema } from '@student/infrastructure/schema/update-stude-status.schema';
import { DniSchema } from '@user/infrastructure/schema/dni.schema';
import { User } from '@user/domain/entity/user.entity';

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
        const { firstname, lastname, dni, email, birthdate, phone, password } = req.body;
        const data = {
            student_password: password,
            user: { firstname, lastname, dni, email, birthdate, phone }
        };

        const validation = await new CreateStudentSchema().validate(data);
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
     * Finds many entities filtered by some user parameter.
     *
     * @param {Request} req - the request object
     * @param {Response} res - the response object
     * @return {Promise<Response>} the response object
     */
    async findManyByUserParam(req: Request, res: Response): Promise<Response> {
        const { param, value } = req.params;

        const response = await this.service.findManyByUserParam(param as keyof User, value);
        if (!response.isSuccess) {
            return res.status(response.error.statusCode).json(response);
        }

        return res.status(200).json(response);
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

        const response = await this.service.updateUser(req.params.id, data);
        if (!response.isSuccess) {
            return res.status(response.error.statusCode).json(response);
        }

        return res.status(200).json(response);
    }

    /**
     * Updates the user's DNI.
     *
     * @param {Request} req - the request object
     * @param {Response} res - the response object
     * @return {Promise<Response>} the updated user's DNI response
     */
    async updateUserDni(req: Request, res: Response): Promise<Response> {
        const { dni } = req.body;

        const validation = await new DniSchema().validate({ dni });
        if (!validation.isSuccess) {
            return res.status(validation.error.statusCode).json(validation);
        }

        const response = await this.service.updateUserDni(req.params.id, dni);
        if (!response.isSuccess) {
            return res.status(response.error.statusCode).json(response);
        }

        return res.status(200).json(response);
    }

    /**
     * Updates the active status of a student.
     *
     * @param {Request} req - request object
     * @param {Response} res - response object
     * @return {Promise<Response>} response object
     */
    async updateStudentStatus(req: Request, res: Response): Promise<Response> {
        const { is_active } = req.body;

        const validation = await new UpdateStudentStatusSchema().validate({ is_active });
        if (!validation.isSuccess) {
            return res.status(validation.error.statusCode).json(validation);
        }

        const response = await this.service.updateStudentStatus(req.params.id, is_active);
        if (!response.isSuccess) {
            return res.status(response.error.statusCode).json(response);
        }

        return res.status(200).json(response);
    }
}