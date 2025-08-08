import { Request, Response } from "express";
import { IAdminAuthController } from "./interfaces/auth.controller.interface";
import { IAuthService } from "../../services/interfaces/auth.interfaces";
import { CustomError, handleError } from "../../utils/customError";
import { ResponseMessages } from "../../constants/responseMessages";
import { HttpStatusCode } from "../../constants/httpStatusCode";
import { injectable, inject } from "tsyringe";


@injectable()
export class AdminAuthController implements IAdminAuthController {

    constructor(
       @inject('IAuthService') private readonly authService: IAuthService ) { }
    async login(req: Request, res: Response): Promise<void> {
        try {

            const { email, password } = req.body

            const user = await this.authService.userLogin({ email, password, role: 'admin' })
            res.status(HttpStatusCode.OK).json({
                success: true,
                message: ResponseMessages.LOGIN_SUCCESS,
                data: user,
            });

        } catch (err) {
            console.log("error in  login admin controller ",err)
            handleError(res,err)
        }
    }
}