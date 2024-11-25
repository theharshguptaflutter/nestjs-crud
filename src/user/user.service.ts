import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { where } from 'sequelize';
import { User } from 'src/models/user/user.model';
import { error, successWithData } from 'utils/response_helper';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User) private userModel: typeof User,
  ) { }


  async register(body, res) {
    console.log("User Resister Service");
    const existingUser = await this.userModel.findOne({
      where: { user_email: body.user_email },
    });

    if (!existingUser) {
      // const hashedPassword = await bcrypt.hash(body.user_password, 10);
      var data = await this.userModel.create({
        user_name: body.user_name ?? "",
        user_email: body.user_email ?? "",
        user_password: body.user_password ?? "",
        user_address: body.user_address ?? "",
        user_phone_number: body.user_phone_number ?? "",
        user_image_url: body.user_image_url ?? "",
      });
      successWithData({
        res,
        isQueryShow: true,
        Query: data,
        statusCode: 200,
        successData: 'User account created',
        errorData: 'User account not created',
      });
      return data;
    } else {
      error(res, 'User already registered', 404);
    }

  }
  async getAllUsers(res) {
    console.log("Find All User Service");
    var FindAllUser = await this.userModel.findAll({ where: { user_account_delete_flag: 0 } });
    successWithData({
      res,
      isQueryShow: true,
      Query: FindAllUser,
      statusCode: 200,
      successData: 'User Details',
      errorData: 'User Details Not Found',
    });
  }
  async getUserById(param, res) {

    var { user_id } = param;
    // console.log(user_id);
    // console.log("Get User By Id Service");
    var FindAllUser = await this.userModel.findOne({ where: { user_id: user_id, user_account_delete_flag: 0 } });
    successWithData({
      res,
      isQueryShow: true,
      Query: FindAllUser,
      statusCode: 200,
      successData: 'User Details',
      errorData: 'User Details Not Found',
    });
  }
  async deleteUserById(param, res) {
    console.log("Delete User By Id Service");
    var { user_id } = param;
    var UserDeleteQuery = await this.userModel.update(
      { user_account_delete_flag: 1 },
      { where: { user_id: user_id, user_account_delete_flag: 0 } });
    successWithData({
      res,
      isQueryShow: false,
      Query: UserDeleteQuery,
      statusCode: 200,
      successData: 'User deleted',
      errorData: 'User Already Deleted',
    });
  }
  async userEdit(body, res) {
    console.log("User Edit Service");
    const userEditQuery = await this.userModel.update(
      {
        user_name: body.user_name ?? "",
        user_email: body.user_email ?? "",
        user_password: body.user_password ?? "",
        user_address: body.user_address ?? "",
        user_phone_number: body.user_phone_number ?? "",
        user_image_url: body.user_image_url ?? "",

      },

      {
        where: { user_id: body.user_id },
      });



    successWithData({
      res,
      isQueryShow: false,
      Query: userEditQuery,
      statusCode: 200,
      successData: 'User account edited',
      errorData: 'User account not edited',
    });
    return userEditQuery;


  }
  async userRatingEdit(bodyList, res) {
    console.log("User Edit Service");
    console.log(bodyList);


   // // Validate that bodyList is an array
    if (!Array.isArray(bodyList) || bodyList.length === 0) {
      return error(
        res,

        'Invalid input: bodyList must be a non-empty array.', 400
      );
     
    }

   const updateResults = [];

    for (var body of bodyList) {
    //  try {
        var userEditQuery = await this.userModel.update(
          {
            user_name: body.user_name ?? "",
            user_email: body.user_email ?? "",
            user_password: body.user_password ?? "",
            user_address: body.user_address ?? "",
            user_phone_number: body.user_phone_number ?? "",
            user_image_url: body.user_image_url ?? "",
            user_rating_flag: body.user_rating_flag ?? ""
          },
          {
            where: { user_id: body.user_id },
          }
        );

        updateResults.push({
          user_id: body.user_id,
          status: userEditQuery[0] > 0 ? "success" : "failed",
        });
      // } catch (error) {
      //   console.error(`Error updating user ${body.user_id}:`, error);
      //   updateResults.push({
      //     user_id: body.user_id,
      //     status: "error",
      //     error: error.message,
      //   });
      // }
    }

   //// Return the results of the update operations
    successWithData({
      res,
      isQueryShow: false,
      Query: updateResults,
      statusCode: 200,
      successData: 'User accounts processed',
      errorData: 'Some updates may have failed',
    });

   return updateResults;
  }


}
