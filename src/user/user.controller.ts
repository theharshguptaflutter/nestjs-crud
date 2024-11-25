import { Body, Controller, Delete, Get, Param, Patch, Post, Res,  } from '@nestjs/common';
import {UserService} from './user.service';

@Controller('user')
export class UserController {
    constructor(private UserService: UserService) {}


    @Post('register')
    async register(@Body() body, @Res() res) {
      await this.UserService.register(body, res);
    }

    @Get('/')
    async getAllUsers(@Res() res) {
      return await this.UserService.getAllUsers(res);
    }
    @Get('/:user_id')
    async getAllUserById(@Param() param, @Res() res) {
      return await this.UserService.getUserById(param,res);
    }
    @Delete('/:user_id')
    async deleteUserById(@Param() param, @Res() res) {
      return await this.UserService.deleteUserById(param,res);
    }
    @Patch('list')
    async userEdit(@Body() body, @Res() res) {
      return await this.UserService.userRatingEdit(body,res);
    }
}

