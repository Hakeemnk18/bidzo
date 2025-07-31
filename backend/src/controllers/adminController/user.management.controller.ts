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
                    console.log("inside if key ",key)
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

    async getUser(req: Request, res: Response): Promise<void> {
        console.log("inside user get")
        
        try {

            const allowedFilters = ['isVerified', 'isBlocked'];
            const filters: Record<string, any> = {};
            allowedFilters.forEach((key) => {
                if (req.query[key]) {
                    console.log("inside if key ",key)
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
}