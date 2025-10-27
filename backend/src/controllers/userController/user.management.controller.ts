import { Request, Response } from "express";
import { IUserManagement } from "./interfaces/user.management.interface";
import { handleError } from "../../utils/customError";
import { IUserManagementService } from "../../services/interfaces/user.management.interface";
import { AuthenticatedRequest } from "../../interfaces/AuthenticatedRequest";
import { HttpStatusCode } from "../../constants/httpStatusCode";
import { injectable, inject } from "tsyringe";
import { ResponseMessages } from "../../constants/responseMessages";
import { email } from "zod";
import { CustomError } from "../../utils/customError";
import { passwordSchema, updateUserSchema } from "../../utils/validations/userValidation";

@injectable()
export class UserManagement implements IUserManagement {
  constructor(
    @inject("IUserManagementService")
    private readonly userManagementService: IUserManagementService
  ) {}

  async getUser(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const { user } = req;
      if (!user) {
        throw new CustomError(
          ResponseMessages.USER_NOT_FOUND,
          HttpStatusCode.NOT_FOUND
        );
      }
      const { id } = user;

      const userData = await this.userManagementService.getUserProfile(id);

      res.status(HttpStatusCode.OK).json({
        success: true,
        data: userData,
      });
    } catch (err) {
      handleError(res, err);
      console.log("error in get user user controller ", err);
    }
  }

  async editUser(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const { user } = req;
      if (!user) {
        throw new CustomError(
          ResponseMessages.USER_NOT_FOUND,
          HttpStatusCode.NOT_FOUND
        );
      }
      const { id } = user;
      
      const validateData = updateUserSchema.parse(req.body);
      await this.userManagementService.userUpdate({ ...validateData, id:id});

      res.status(HttpStatusCode.OK).json({
        success: true,
        message: ResponseMessages.APPLICATION_SUBMITTED,
      });
    } catch (err) {
      handleError(res, err);
      console.log("error in user edit controlled ", err);
    }
  }

  async checkPassword(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const { user } = req;
      if (!user) {
        throw new CustomError(
          ResponseMessages.USER_NOT_FOUND,
          HttpStatusCode.NOT_FOUND
        );
      }
      const { id } = user;
      const { password } = req.body;

      const success = await this.userManagementService.passwordMatch(
        password,
        id
      );
      res.status(HttpStatusCode.OK).json({
        success: success,
      });
    } catch (err) {
      handleError(res, err);
      console.log("error in user password check controlled ", err);
    }
  }

  async changePassword(
    req: AuthenticatedRequest,
    res: Response
  ): Promise<void> {
    try {
      const { user } = req;
      if (!user) {
        throw new CustomError(
          ResponseMessages.USER_NOT_FOUND,
          HttpStatusCode.NOT_FOUND
        );
      }
      const { id } = user;
      const { password, oldPassword } = passwordSchema.parse(req.body)

      await this.userManagementService.changePassword(id, password, oldPassword);
      res.status(HttpStatusCode.OK).json({
        success: true,
        message: ResponseMessages.PASSWORD_UPDATED,
      });
    } catch (err) {
      handleError(res, err);
      console.log("error in change password controller ", err);
    }
  }
}
