import { Request, Response } from "express";
import { IAuthController } from "./interfaces/auth.controller.interface";
import { IAuthService } from "../../services/interfaces/auth.interfaces";
import { CustomError } from "../../utils/customError";




export class AuthController implements IAuthController {

  constructor(private readonly authService: IAuthService) { }

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
      res.status(500).json({
        success: false,
        message: "Google login failed",
        error: err instanceof Error ? err.message : "Unknown error",
      });
    }
  }


  async signUp(req: Request, res: Response): Promise<void> {
    try {
      console.log("inside signup ", req.body)
      const { name, password, email, phoneNumber } = req.body
      const user = await this.authService.signUp({ name, email, password, phoneNumber })
      res.status(200).json({
        success: true,
        message: "Signup successful",
        data: user,
      });
    } catch (err) {
      console.error("Signup filed controller", err);
      res.status(500).json({
        success: false,
        message: "Google login failed",
        error: err instanceof Error ? err.message : "Unknown error",
      });
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
}






