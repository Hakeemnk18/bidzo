import { Router } from "express";
// import { authService } from "../di/auth.di";
//import { userService } from "../di/user.di";
import { AdminAuthController } from "../controllers/adminController/auth.controller";
import { UserMangementController } from "../controllers/adminController/user.management.controller";
import { authenticate } from "../middileware/authmiddileware";
import { authorizeRoles } from "../middileware/role.middileware";
import { isBlockedMiddleware } from "../middileware/isBlocked.middleware";
import { container } from '../di/container'
import { PlanMangementController } from "../controllers/adminController/plan.management";




const router = Router()
const adminAuthController = container.resolve(AdminAuthController)
const adminUserManagementController = container.resolve(UserMangementController)
const planManagementController = container.resolve(PlanMangementController)


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

router.patch('/seller/management/:id',
    authenticate,
    authorizeRoles('admin'),
    (req, res)=> adminUserManagementController.approveSeller(req,res)
)


router.patch('/seller/management/:id/reject',
    authenticate,
    authorizeRoles('admin'),
    (req, res)=> adminUserManagementController.rejectSeller(req,res)
)


//plan
router.post('/plan',
    (req, res)=> planManagementController.createPlan(req,res)
)

router.get('/plan/management',
    (req, res)=> planManagementController.getPlans(req,res)
)

router.patch('/plan',
    (req, res)=> planManagementController.blockAndUnblockPlan(req,res)
)

router.get('/plan/:id',
    (req,res)=> planManagementController.getPlan(req,res)
)

router.put('/plan',
    (req,res)=> planManagementController.editPlan(req,res)
)







export default router