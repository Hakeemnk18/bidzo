import { Request, Response } from "express";
import { ISellerAuthController } from "./interfaces/auth.controller.interface";
import { IAuthService } from "../../services/interfaces/auth.interfaces";
import { CustomError, handleError } from "../../utils/customError";
import { IUserManagementService } from "../../services/interfaces/user.management.interface";
import { HttpStatusCode } from "../../constants/httpStatusCode";
import { ResponseMessages } from "../../constants/responseMessages";
import { inject, injectable } from "tsyringe";


@injectable()
export class SellerAuthController implements ISellerAuthController {

    constructor(
       @inject('IAuthService') private readonly authService: IAuthService,
       @inject('IUserManagementService') private readonly userMangementService: IUserManagementService

    ) { }
    async signup(req: Request, res: Response): Promise<void> {
        try {

            const { name, password, email, phone, documentUrl } = req.body
            

            const user = await this.authService.signUp({ name, email, password, phone, role: "seller", isVerified: "pending", documentUrl })
            res.status(HttpStatusCode.OK).json({
                success: true,
                message: ResponseMessages.SELLER_SIGNUP_PENDING,
                data: user,
            });
        } catch (err) {
            console.error("Signup filed controller", err);
            handleError(res, err)
        }
    }

    async login(req: Request, res: Response): Promise<void> {
        try {

            const { email, password } = req.body

            const user = await this.authService.userLogin({ email, password, role: 'seller' })
            res.status(HttpStatusCode.OK).json({
                success: true,
                message: ResponseMessages.LOGIN_SUCCESS,
                data: user,
            });

        } catch (err: any) {
            console.log("error in  login user controller ")
            handleError(res, err)
        }
    }

    async reapply(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params
            const { documentUrl } = req.body
            
            await this.userMangementService.sellerReapply(id,documentUrl)
            res.status(HttpStatusCode.OK).json({
                success: true,
                message: ResponseMessages.APPLICATION_SUBMITTED,
            });
        } catch (err) {
            console.log("error in  login user controller ")
            handleError(res, err)
        }
    }
}