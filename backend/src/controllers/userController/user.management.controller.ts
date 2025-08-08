import { Request, Response } from "express";
import { IUserManagement } from "./interfaces/user.management.interface";
import { handleError } from "../../utils/customError";
import { IUserManagementService } from "../../services/interfaces/user.management.interface";
import { AuthenticatedRequest } from "../../interfaces/AuthenticatedRequest";
import { HttpStatusCode } from "../../constants/httpStatusCode";
import { injectable, inject } from "tsyringe";
import { ResponseMessages } from "../../constants/responseMessages";


@injectable()
export class UserManagement implements IUserManagement {

    constructor(@inject('IUserManagementService') private readonly userManagementService : IUserManagementService){}

    async getUser(req: AuthenticatedRequest, res: Response): Promise<void> {
        
        try {   

            console.log("inside get user controller")
            
            const { id } = req.user!
            
            const userData = await this.userManagementService.getUserProfile(id)
            
            res.status(HttpStatusCode.OK).json({
                success: true,
                data: userData
            })
        } catch (err) {
            handleError(res, err)
            console.log("error in get user user controller ", err)
        }
    }

    async editUser(req: AuthenticatedRequest, res: Response): Promise<void> {
        try {
            console.log("inside edit user ")
            const { id } = req.user!
            const { name, phone } = req.body

            await this.userManagementService.userUpdate({id, name, phone})

            res.status(HttpStatusCode.OK).json({
                success: true,
                message: ResponseMessages.APPLICATION_SUBMITTED
            })
            
        } catch (err) {
            handleError(res, err)
            console.log("error in user edit controlled ", err)
        }
    }
}