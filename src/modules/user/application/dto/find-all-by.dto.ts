import { User } from '@user/domain/entity/user.entity';

export class FindAllByDto {
    param: keyof User;
    value: string | number | Date;

    constructor(data: FindAllByDto) {
        Object.assign(this, data);
    }
}