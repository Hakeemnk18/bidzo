import { Router } from "express";
import { authService } from "../di/auth.di";
import { AdminAuthController } from "../controllers/adminController/auth.controller";


const router = Router()
const adminAuthController = new AdminAuthController(authService)


router.post('/login',(req,res)=> adminAuthController.login(req,res))




export default router