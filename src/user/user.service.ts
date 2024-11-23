import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from 'src/models/user/user.model';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User) private userModel: typeof User,
      ) {}
}
