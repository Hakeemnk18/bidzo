
import { AuthService } from '../services/auth.service';
import { UserRepository } from '../repositories/user.repo';
import { JWTService } from '../services/jwt.service';

import { ResetRepo } from '../repositories/reset.repo';

import { OTPService } from '../services/otp.service';
import { OTPRepository } from '../repositories/OTP.repo';



const userRepo = new UserRepository();
const resetRepo = new ResetRepo()
const jwtService = new JWTService()
const otpRepo = new OTPRepository()
const otpService = new OTPService(otpRepo)

export const authService = new AuthService(userRepo,jwtService,otpService, resetRepo);



