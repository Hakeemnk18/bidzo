import { Request, Response } from "express";
import { IUserManagement } from "./interfaces/user.management.interface";
import { IUserManagementService } from "../../services/interfaces/user.management.interface";
import { CustomError, handleError } from "../../utils/customError";


export class UserMangementController implements IUserManagement {

    constructor(private readonly userMangementService: IUserManagementService) { }

    async getSeller(req: Request, res: Response): Promise<void> {
        console.log("inside seller get")
        try {
            const page = parseInt(req.query.page as string) || 1;
            const search = req.query.search as string || ''
            const limit =  2;
            const filter = req.query.filter as string || ''
            const filterField = req.query.filterField as string || ''
            const sortValue = req.query.sort as string || ''
            // console.log("page ",page)
            // console.log("search ",search)
            // console.log("fillter field ",filterField)
            // console.log("filter ",filter)
            console.log("sort ",sortValue)

            const result = await this.userMangementService.getSeller(
                { role: 'seller', 
                    page, limit, 
                    search, filter, 
                    filterField, sortValue
                })

            // console.log("users ",result)
            // console.log("total doc ",result.total)
            res.status(200).json({
                success: true,
                data: result.resData,
                total: result.total,
                currentPage: page,
                totalPages: Math.ceil(result.total / limit),
            });
        } catch (err) {
            console.log("error in  login user controller ")
            handleError(res,err)
        }


    }

    async getUser(req: Request, res: Response): Promise<void> {
        // console.log("inside user get")
        // try {
        //     const page = parseInt(req.query.page as string) || 1;
        //     const limit = 5;
        //     const result = await this.userMangementService.getSeller({ role: 'user', page, limit })

        //     res.status(200).json({
        //         success: true,
        //         data: result.resData,
        //         total: result.total,
        //         currentPage: page,
        //         totalPages: Math.ceil(result.total / limit),
        //     });
        // } catch (err) {
        //     console.log("error in  login user controller ")
        //     handleError(res,err)
        // }
    }
}