import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
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
}
