
import { AuthService } from '../services/auth.service';
import { UserRepository } from '../repositories/user.repo';
import { JWTService } from '../services/jwt.service';
import { OTPRepository } from '../repositories/OTP.repo';
import { OTPService } from '../services/otp.service';
import { ResetRepo } from '../repositories/reset.repo';



const userRepo = new UserRepository();
const jwtService = new JWTService()
const otpRepo = new OTPRepository()
const otpService = new OTPService(otpRepo)
const resetRepo = new ResetRepo()
export const authService = new AuthService(userRepo,jwtService,otpService, resetRepo);



