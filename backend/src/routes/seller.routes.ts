import { Router } from "express";
import { SellerAuthController } from "../controllers/sellerController/auth.controller";
import { container } from'../di/container'
import { authorizeRoles } from "../middileware/role.middileware";
import { AuthenticatedRequest } from "../interfaces/AuthenticatedRequest";
import { ProductController } from "../controllers/sellerController/product.controller";
import { authenticate } from "../middileware/authmiddileware";


const sellerAuthController = container.resolve(SellerAuthController)
const productController = container.resolve(ProductController)

const router = Router()




router.post('/sign-up',(req,res)=> sellerAuthController.signup(req,res))
router.post('/login',(req,res)=> sellerAuthController.login(req,res))
router.patch('/reapply/:id',(req,res)=> sellerAuthController.reapply(req,res))

router.get('/product/management',
    authenticate,
    authorizeRoles('seller'),
    (req,res)=> productController.getAllProducts(req as AuthenticatedRequest,res)
)

router.post('/product',
    authenticate,
    authorizeRoles('seller'),
    (req,res)=> productController.createProduct(req as AuthenticatedRequest,res)
)

router.get('/category/name',
    authenticate,
    authorizeRoles('seller'),
    (req,res)=> productController.getCategoriesName(req,res)
)

export default router