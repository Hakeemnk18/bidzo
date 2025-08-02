import { Router } from "express";
import { authService } from "../di/auth.di";
import { userService } from "../di/user.di";
import { AdminAuthController } from "../controllers/adminController/auth.controller";
import { UserMangementController } from "../controllers/adminController/user.management.controller";
import { authenticate } from "../middileware/authmiddileware";
import { authorizeRoles } from "../middileware/role.middileware";
import { isBlockedMiddleware } from "../middileware/isBlocked.middleware";




const router = Router()
const adminAuthController = new AdminAuthController(authService)
const adminUserManagementController = new UserMangementController(userService)


router.post('/login',(req,res)=> adminAuthController.login(req,res))

router.get(
    '/seller/management', 
    authenticate,
    authorizeRoles('admin'),
    (req,res)=> adminUserManagementController.getSeller(req, res)
)



router.patch('/user/management',
    authenticate,
    authorizeRoles('admin'),
    
    (req,res)=> adminUserManagementController.blockAndUnblock(req, res)
)

router.get('/user/management', 
    authenticate,
    authorizeRoles('admin'),
    (req,res)=> adminUserManagementController.getUser(req, res)
)

router.patch('/seller/management',
    (req, res)=> adminUserManagementController.approveSeller(req,res)
)







export default router