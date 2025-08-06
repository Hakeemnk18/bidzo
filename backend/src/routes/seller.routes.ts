import { Router } from "express";
import { authService } from "../di/auth.di";
import { SellerAuthController } from "../controllers/sellerController/auth.controller";
import { userService } from "../di/user.di";

const sellerAuthController = new SellerAuthController (authService, userService)

const router = Router()




router.post('/sign-up',(req,res)=> sellerAuthController.signup(req,res))
router.post('/login',(req,res)=> sellerAuthController.login(req,res))
router.patch('/reapply/:id',(req,res)=> sellerAuthController.reapply(req,res))

export default router