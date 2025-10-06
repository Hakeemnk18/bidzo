import { Router } from 'express';
import { AuthController } from '../controllers/userController/auth.controller';
import { UserManagement } from '../controllers/userController/user.management.controller';
import { AuthenticatedRequest } from '../interfaces/AuthenticatedRequest';
import { authenticate } from '../middileware/authmiddileware';
import { container } from '../di/container';
import { UserNotificationController } from '../controllers/userController/user.notification.controller';
import { UserSubscriptionController } from '../controllers/userController/user.subscription.controller';



const router = Router();



const authController = container.resolve(AuthController)
const userController = container.resolve(UserManagement)
const notificationController = container.resolve(UserNotificationController)
const subscriptionController = container.resolve(UserSubscriptionController)



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

router.patch('/profile',
  authenticate,
  (req, res)=> userController.editUser(req as AuthenticatedRequest, res)
)

router.post('/check-password',
  authenticate,
  (req, res)=> userController.checkPassword(req as AuthenticatedRequest, res)
)

router.patch('/password',
  authenticate,
  (req, res)=> userController.changePassword(req as AuthenticatedRequest, res)
)

router.get('/notification',
  authenticate,
  (req, res)=> notificationController.getAll(req as AuthenticatedRequest, res)
)

router.patch('/notification/:id',
  (req,res)=> notificationController.markAsRead(req,res)
)

router.get('/plans',
  authenticate,
  (req,res)=> subscriptionController.getPlans(req as AuthenticatedRequest,res)
)

router.post('/creat-order',
  authenticate,
  (req,res)=> subscriptionController.createRazorpayOrder(req as AuthenticatedRequest,res)
)

router.post('/verify-payment',
  authenticate,
  (req,res)=> subscriptionController.verifyPayment(req as AuthenticatedRequest,res)
)

export default router;


