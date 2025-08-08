import { Router } from "express";
import { SellerAuthController } from "../controllers/sellerController/auth.controller";
import { container } from'../di/container'


const sellerAuthController = container.resolve(SellerAuthController)

const router = Router()




router.post('/sign-up',(req,res)=> sellerAuthController.signup(req,res))
router.post('/login',(req,res)=> sellerAuthController.login(req,res))
router.patch('/reapply/:id',(req,res)=> sellerAuthController.reapply(req,res))

export default router