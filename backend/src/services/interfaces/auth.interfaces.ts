import { VerifyReqOTP } from "../../dtos/OTP.dto";
import { GoogleLoginDTO, UserSignUpDTO } from "../../dtos/userLogin.dto"
import { UserLoginResponseDTO } from "../../dtos/userLogin.dto";

export interface IAuthService {
  googleLogin(data: GoogleLoginDTO): Promise<UserLoginResponseDTO>;
  signUp(data: UserSignUpDTO): Promise<UserLoginResponseDTO>;
  sendOTPtoEmail(email: string): Promise<void>
  verifyOtp(otpData: VerifyReqOTP): Promise<void>
}

