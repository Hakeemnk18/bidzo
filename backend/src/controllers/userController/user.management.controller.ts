import { Request, Response } from "express";
import { IUserManagement } from "./interfaces/user.management.interface";
import { handleError } from "../../utils/customError";
import { IUserManagementService } from "../../services/interfaces/user.management.interface";
import { AuthenticatedRequest } from "../../interfaces/AuthenticatedRequest";
import { HttpStatusCode } from "../../constants/httpStatusCode";



export class UserManagement implements IUserManagement {

    constructor(private readonly userManagementService : IUserManagementService){}

    async getUser(req: AuthenticatedRequest, res: Response): Promise<void> {
        
        try {   

            console.log("inside get user controller")
            
            const { id } = req.user!
            console.log("user id",id)
            const userData = await this.userManagementService.getUserProfile(id)
            console.log(userData)
            res.status(HttpStatusCode.OK).json({
                success: true,
                data: userData
            })
        } catch (err) {
            handleError(res, err)
        }
    }
}