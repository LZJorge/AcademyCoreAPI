import { IUserRepository } from '@user/domain/repository/user.repository';
import { ITransactionManager } from '@shared/domain/repositories/transaction.manager';

/**
 * UseCases
 */
import { createUser } from '@user/application/useCases/create';
import { findOneUserById } from '@user/application/useCases/find-one-by-id';
import { findOneUserByDni } from '@user/application/useCases/find-one-by-dni';
import { findAllUser } from '@user/application/useCases/find-all';
import { findAllUserByParam } from '@user/application/useCases/find-all-by-param';
import { findAndUpdateUser } from '@user/application/useCases/update';
import { findAndUpdateUserDNI } from '@user/application/useCases/update-dni';

/**
 * DTOs
 */
import { ICreateUserDto } from '@user/application/dto/create-user.dto';
import { FindAllByDto } from '@user/application/dto/find-all-by.dto';
import { IUpdateUserDto } from '@user/application/dto/update-user.dto';
import { IDniDto } from '@user/application/dto/dni.dto';

/**
 * Responses
 */
import { CreateUserResponse } from '@user/application/responses/create-user';
import { UpdateUserResponse } from '@user/application/responses/update-user';
import { FindOneUserResponse } from '@user/application/responses/find-one-user';
import { FindManyUserResponse } from '@user/application/responses/find-many-user';

export class UserService {
    constructor(
        private readonly repository: IUserRepository,
        private readonly manager: ITransactionManager
    ) {}

    /**
     * @method Create
     */
    async create(dto: ICreateUserDto): Promise<CreateUserResponse> {
        return await createUser(dto, this.repository, this.manager);
    }

    /**
     * @method Read
     */
    async findOneByID(id: string): Promise<FindOneUserResponse> {
        return await findOneUserById(id, this.repository, this.manager);
    }
    async findOneByDNI(dni: string): Promise<FindOneUserResponse> {
        return await findOneUserByDni(dni, this.repository, this.manager);
    }
    async findAll(): Promise<FindManyUserResponse> {
        return await findAllUser(this.repository, this.manager);
    }
    async findAllBy(dto: FindAllByDto): Promise<FindManyUserResponse> {
        return await findAllUserByParam(dto, this.repository, this.manager);
    }

    /**
     * @method Update
     */
    async updateInfo(id: string, dto: IUpdateUserDto): Promise<UpdateUserResponse> {
        return await findAndUpdateUser({ id, dto }, this.repository, this.manager);
    }
    async updateDNI(id: string, dto: IDniDto): Promise<UpdateUserResponse> {
        return await findAndUpdateUserDNI({ id, dto }, this.repository, this.manager);
    }
}