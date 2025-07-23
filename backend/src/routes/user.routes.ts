import { Router } from 'express';
import { AuthService } from '../services/auth.service';
import { UserRepository } from '../repositories/user.repo';
import { AuthController } from '../controllers/auth.controller';
import { JWTService } from '../services/jwt.service';

const router = Router();

// Dependency injection
const userRepo = new UserRepository();
const jwtService = new JWTService()
const authService = new AuthService(userRepo,jwtService);
const authController = new AuthController(authService);



//router.post("/login", authController);
router.post('/google-login', (req, res) => authController.googleLogin(req, res));

export default router;
