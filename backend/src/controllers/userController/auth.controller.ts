import { Request, Response } from "express";
import { IAuthController } from "./interfaces/auth.controller.interface";
import { IAuthService } from "../../services/interfaces/auth.interfaces";
import { CustomError, handleError } from "../../utils/customError";
import { HttpStatusCode } from "../../constants/httpStatusCode";
import { ResponseMessages } from "../../constants/responseMessages";




export class AuthController implements IAuthController {

  constructor(private readonly authService: IAuthService) { }

  async loginUser(req: Request, res: Response): Promise<void> {
    try {
      console.log("inside login ")
      const { email, password } = req.body
      const user = await this.authService.userLogin({ email, password, role: 'user' })
      res.status(HttpStatusCode.OK).json({
        success: true,
        message: ResponseMessages.LOGIN_SUCCESS,
        data: user,
      });

    } catch (err) {
      console.log("error in  login user controller ")
      handleError(res, err)
    }
  }

  async googleLogin(req: Request, res: Response): Promise<void> {

    try {
      const { token } = req.body;

      const user = await this.authService.googleLogin({ token });
      res.status(HttpStatusCode.OK).json({
        success: true,
        message: ResponseMessages.LOGIN_SUCCESS,
        data: user,
      });
    } catch (err) {
      console.error("Google Login Failed", err);
      handleError(res, err)
    }
  }


  async signUp(req: Request, res: Response): Promise<void> {
    try {

      const { name, password, email, phone } = req.body
      const user = await this.authService.signUp({ name, email, password, phone, role: "user", isVerified: "approved" })
      res.status(HttpStatusCode.OK).json({
        success: true,
        message: ResponseMessages.LOGIN_SUCCESS,
        data: user,
      });
    } catch (err) {
      console.error("Signup filed controller", err);
      handleError(res, err)
    }
  }

  async sendOTP(req: Request, res: Response): Promise<void> {
    try {
      console.log("inside send otp")
      const { email } = req.body
      await this.authService.sendOTPtoEmail(email)
      res.status(HttpStatusCode.OK).json({
        success: true,
        message: ResponseMessages.OTP_SEND_SUCCESS
      });
    } catch (err) {
      console.log("error in end otp controller")
      handleError(res, err)
    }
  }

  async verifyOTP(req: Request, res: Response): Promise<void> {
    try {


      const { email, otp } = req.body
      await this.authService.verifyOtp({ email, otp })
      res.status(HttpStatusCode.OK).json({
        success: true,
        message: ResponseMessages.OTP_VERIFY_SUCCES,
      });
    } catch (err) {
      console.error("error in verify otp controller", err);
      handleError(res, err)
    }

  }

  async verifyEmail(req: Request, res: Response): Promise<void> {

    try {
      console.log("inside verify email")
      const { email } = req.body

      await this.authService.generateResetToken(email)
      

      res.status(HttpStatusCode.OK).json({
        success: true,
        message: ResponseMessages.EMAIL_LINK_SEND,
      })
    } catch (err) {
      console.log("error in verify email controller ",err)
      handleError(res, err)
    }

  }

  async forgotPassword(req: Request, res: Response): Promise<void> {
    try {
      console.log("inside forgot controller ")
      const { password, token} = req.body

      const role = await this.authService.fogetPassword(token, password)

      res.status(HttpStatusCode.OK).json({
        success: true,
        message: ResponseMessages.PASSWORD_UPDATED,
        data:role
      })

    } catch (err) {
      console.log("error in verify email controller ",err)
      handleError(res, err)
    }
  }
}






