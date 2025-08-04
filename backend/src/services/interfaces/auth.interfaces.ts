import { VerifyReqOTP } from "../../dtos/OTP.dto";
import { GoogleLoginDTO, UserLoginDTO, UserSignUpDTO } from "../../dtos/userLogin.dto"
import { UserLoginResponseDTO } from "../../dtos/userLogin.dto";
import { User } from "../../types/userType";

export interface IAuthService {
  userLogin(userData: UserLoginDTO): Promise<UserLoginResponseDTO>
  googleLogin(data: GoogleLoginDTO): Promise<UserLoginResponseDTO>;
  signUp(data: UserSignUpDTO): Promise<UserLoginResponseDTO>;
  sendOTPtoEmail(email: string): Promise<void>
  verifyOtp(otpData: VerifyReqOTP): Promise<void>;
  verifyEmail(email: string): Promise<User>
  generateResetToken(email: string): Promise<void>
  fogetPassword(token: string, password: string): Promise<string>
}

