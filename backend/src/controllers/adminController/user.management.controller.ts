import { Request, Response } from "express";
import { IUserManagement } from "./interfaces/user.management.interface";
import { IUserManagementService } from "../../services/interfaces/user.management.interface";
import { handleError } from "../../utils/customError";


export class UserMangementController implements IUserManagement {

    constructor(private readonly userMangementService: IUserManagementService) { }

    async getSeller(req: Request, res: Response): Promise<void> {
        console.log("inside seller get")
         try {

            const allowedFilters = ['isVerified', 'isBlocked'];
            const filters: Record<string, any> = {};
            allowedFilters.forEach((key) => {
                if (req.query[key]) {
                    
                    filters[key] = req.query[key];
                }
            });

            

            const page = parseInt(req.query.page as string) || 1;
            const search = req.query.search as string || ''
            const limit = 2;
            const sortValue = req.query.sort as string || ''

            const result = await this.userMangementService.getSeller(
                {
                    role: 'seller',
                    page, limit,
                    search, sortValue,
                    filters
                })

            res.status(200).json({
                success: true,
                data: result.resData,
                total: result.total,
                currentPage: page,
                totalPages: Math.ceil(result.total / limit),
            });
        } catch (err) {
            console.log("error in  login user controller ")
            handleError(res, err)
        }


    }

    async getUser(req: Request, res: Response): Promise<void> {
        console.log("inside user get")
        
        try {

            const allowedFilters = ['isVerified', 'isBlocked'];
            const filters: Record<string, any> = {};
            allowedFilters.forEach((key) => {
                if (req.query[key]) {
                    filters[key] = req.query[key];
                }
            });

            

            const page = parseInt(req.query.page as string) || 1;
            const search = req.query.search as string || ''
            const limit = 2;
            const sortValue = req.query.sort as string || ''

            const result = await this.userMangementService.getSeller(
                {
                    role: 'user',
                    page, limit,
                    search, sortValue,
                    filters
                })

            res.status(200).json({
                success: true,
                data: result.resData,
                total: result.total,
                currentPage: page,
                totalPages: Math.ceil(result.total / limit),
            });
        } catch (err) {
            console.log("error in  login user controller ")
            handleError(res, err)
        }
    }

    async blockAndUnblock(req: Request, res: Response): Promise<void> {
        try {
            console.log("inside block and unblock")
            const { userId } = req.body
            
            await this.userMangementService.blockAndUnBlock(userId, "isBlocked")

            res.status(200).json({
                success: true,
                message: "successfully updated"
            })
            
        } catch (err) {
            console.log("error in  block and unblock user controller ",err)
            handleError(res, err)
        }
    }

    async approveSeller(req: Request, res: Response): Promise<void> {
         try {
            console.log("inside block and unblock")

            const { id } = req.params
            console.log(id)
            await this.userMangementService.blockAndUnBlock(id, "isVerified")

            res.status(200).json({
                success: true,
                message: "successfully updated"
            })
            
        } catch (err) {
            console.log("error in  block and unblock user controller ",err)
            handleError(res, err)
        }
    }

    async rejectSeller(req: Request, res: Response): Promise<void> {
        try {
            console.log("inside reject seller")

            const { id } = req.params
            const { reason } = req.body
            console.log("id ",id)
            console.log("reason ",reason)
            await this.userMangementService.sellerreject(id,reason)

            res.status(200).json({
                success: true,
                message: "account rejected"
            })
            
        } catch (err) {
            console.log("error in  reject seller user controller ",err)
            handleError(res, err)
        }
    }

}