import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from 'src/models/user/user.model';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User) private userModel: typeof User,
      ) {}


      async register(body, res){
        console.log("User Resister Service");
        
      }
      async getAllUsers(res){
        console.log("Find All User Service");

      }
      async getUserById(param,res){
        console.log("Get User By Id Service");
      }
}
