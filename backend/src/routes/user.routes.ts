import { Router } from 'express';
import { authService } from '../di/auth.di';
import { AuthController } from '../controllers/userController/auth.controller';
import { UserManagement } from '../controllers/userController/user.management.controller';
import { userService } from '../di/user.di';
import { AuthenticatedRequest } from '../interfaces/AuthenticatedRequest';
import { authenticate } from '../middileware/authmiddileware';



const router = Router();



const authController = new AuthController(authService);
const userController = new UserManagement(userService)



router.post("/login", (req, res)=> authController.loginUser(req,res));
router.post('/google-login', (req, res) => authController.googleLogin(req, res));
router.post('/sign-up', (req,res)=> authController.signUp(req,res))
router.post('/send-otp', (req,res)=> authController.sendOTP(req,res))
router.post('/verify-otp', (req,res)=> authController.verifyOTP(req,res))
router.post('/email',(req,res)=> authController.verifyEmail(req,res))
router.post('/forgot-password',(req,res)=> authController.forgotPassword(req,res))
router.get('/profile', 
  authenticate,
  (req , res) => userController.getUser(req as AuthenticatedRequest, res)
);

export default router;
