import { Router } from "express";
import { authService } from "../di/auth.di";
import { SellerAuthController } from "../controllers/sellerController/auth.controller";

const sellerAuthController = new SellerAuthController (authService)
const router = Router()




router.post('/sign-up',(req,res)=> sellerAuthController.signup(req,res))

export default router