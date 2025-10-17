import { Router } from "express";
import { SellerAuthController } from "../controllers/sellerController/auth.controller";
import { container } from'../di/container'
import { authorizeRoles } from "../middileware/role.middileware";
import { AuthenticatedRequest } from "../interfaces/AuthenticatedRequest";
import { ProductController } from "../controllers/sellerController/product.controller";
import { authenticate } from "../middileware/authmiddileware";
import { AuctionController } from "../controllers/sellerController/auction.controller";


const sellerAuthController = container.resolve(SellerAuthController)
const productController = container.resolve(ProductController)
const auctionController = container.resolve(AuctionController)

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

router.patch('/product/:id',
    authenticate,
    authorizeRoles('seller'),
    (req, res)=> productController.blockAndUnblock(req as AuthenticatedRequest,res)
)

router.put('/product/:id',
    authenticate,
    authorizeRoles('seller'),
    (req,res)=> productController.updatePorduct(req as AuthenticatedRequest,res)
)

router.get('/product/:id',
    authenticate,
    authorizeRoles('seller'),
    (req, res)=> productController.getProduct(req as AuthenticatedRequest, res)
)

router.post('/auction',
    authenticate,
    authorizeRoles('seller'),
    (req,res)=> auctionController.createAuction(req as AuthenticatedRequest, res)
)

router.get('/auction/allProducts',
    authenticate,
    authorizeRoles('seller'),
    (req,res)=> auctionController.allProduct(req as AuthenticatedRequest, res)
)

router.get('/auction/management',
    authenticate,
    authorizeRoles('seller'),
    (req,res)=> auctionController.allAuctions(req as AuthenticatedRequest,res)
)

router.patch('/auction/:id/block',
    authenticate,
    authorizeRoles('seller'),
    (req,res)=> auctionController.cancelAuction(req as AuthenticatedRequest, res)
)

router.patch('/auction/:id/unblock',
    authenticate,
    authorizeRoles('seller'),
    (req,res)=> auctionController.unblockAuction(req as AuthenticatedRequest, res)
)

export default router