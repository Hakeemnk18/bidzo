import { Router } from "express";
import { authService } from "../di/auth.di";
import { userService } from "../di/user.di";
import { AdminAuthController } from "../controllers/adminController/auth.controller";
import { UserMangementController } from "../controllers/adminController/user.management.controller";


const router = Router()
const adminAuthController = new AdminAuthController(authService)
const adminUserManagementController = new UserMangementController(userService)


router.post('/login',(req,res)=> adminAuthController.login(req,res))
router.get('/seller/management', (req,res)=> adminUserManagementController.getSeller(req, res))
router.get('/user/management', (req,res)=> adminUserManagementController.getUser(req, res))





export default router