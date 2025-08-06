import { Request, Response } from "express";
import { IAuthController } from "./interfaces/auth.controller.interface";
import { IAuthService } from "../../services/interfaces/auth.interfaces";
import { CustomError, handleError } from "../../utils/customError";




export class AuthController implements IAuthController {

  constructor(private readonly authService: IAuthService) { }

  async loginUser(req: Request, res: Response): Promise<void> {
    try {
      console.log("inside login ")
      const { email, password } = req.body
      const user = await this.authService.userLogin({ email, password, role: 'user' })
      res.status(200).json({
        success: true,
        message: "Login successful",
        data: user,
      });

    } catch (err) {
      console.log("error in  login user controller ")
      if (err instanceof CustomError) {
        res.status(err.statusCode).json({ message: err.message });
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  }

  async googleLogin(req: Request, res: Response): Promise<void> {

    try {
      const { token } = req.body;

      const user = await this.authService.googleLogin({ token });
      res.status(200).json({
        success: true,
        message: "Login successful",
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
      res.status(200).json({
        success: true,
        message: "Signup successful",
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
      res.status(200).json({
        success: true,
        message: "OTP send successfully",
      });
    } catch (err) {
      console.log("error in end otp controller")
      if (err instanceof CustomError) {
        res.status(err.statusCode).json({ message: err.message });
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  }

  async verifyOTP(req: Request, res: Response): Promise<void> {
    try {


      const { email, otp } = req.body
      await this.authService.verifyOtp({ email, otp })
      res.status(200).json({
        success: true,
        message: "OTP verified successfully",
      });
    } catch (err) {
      console.error("error in verify otp controller", err);
      const statusCode = err instanceof Error && (err.message === "OTP has expired" || err.message === "Invalid OTP")
        ? 400
        : 500;
      res.status(statusCode).json({
        success: false,
        message: err instanceof Error ? err.message : "Unknown error",
      });
    }

  }

  async verifyEmail(req: Request, res: Response): Promise<void> {

    try {
      console.log("inside verify email")
      const { email } = req.body

      await this.authService.generateResetToken(email)
      

      res.status(200).json({
        success: true,
        message: "link sent to emal",
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

      res.status(200).json({
        success: true,
        message: "password updated",
        data:role
      })

    } catch (err) {
      console.log("error in verify email controller ",err)
      handleError(res, err)
    }
  }
}






