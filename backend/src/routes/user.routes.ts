import { Router } from 'express';
import { AuthService } from '../services/auth.service';
import { UserRepository } from '../repositories/user.repo';
import { AuthController } from '../controllers/userController/auth.controller';
import { JWTService } from '../services/jwt.service';
import { OTPRepository } from '../repositories/OTP.repo';
import { OTPService } from '../services/otp.service';

const router = Router();


const userRepo = new UserRepository();
const jwtService = new JWTService()
const otpRepo = new OTPRepository()
const otpService = new OTPService(otpRepo)
const authService = new AuthService(userRepo,jwtService,otpService);
const authController = new AuthController(authService);



router.post("/login", (req, res)=> authController.loginUser(req,res));
router.post('/google-login', (req, res) => authController.googleLogin(req, res));
router.post('/sign-up', (req,res)=> authController.signUp(req,res))
router.post('/send-otp', (req,res)=> authController.sendOTP(req,res))
router.post('/verify-otp', (req,res)=> authController.verifyOTP(req,res))

export default router;
