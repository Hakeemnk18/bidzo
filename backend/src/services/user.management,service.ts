import { Request, Response } from "express";
import { IUserManagementService } from "./interfaces/user.management.interface";
import { IUserRepository } from "../repositories/user.repo.interface";

import {  GetUsersDTO, ResGetUser } from "../dtos/userLogin.dto";
import { User } from "../types/userType";



export class UserMangementService implements IUserManagementService {

    constructor(private readonly userRepo: IUserRepository) { }

    async getSeller(getUser: GetUsersDTO): Promise<{ resData: ResGetUser[]; total: number }> {



        const { role, page, limit, search,  sortValue, filters } = getUser
        let sort:Record<string, any > = {}
        const query: Record<string, any > = {
            role: role,
        }

        if (search && search.trim() !== "") {
            query.name = { $regex: `^${search.trim()}`, $options: 'i' };
        }

        if(Object.keys(filters).length !== 0){
            for(let key in filters){
                query[key] = filters[key] === "true"
            }
        }

       

     

        if(sortValue && sortValue.trim() !== ""){
            if(sortValue === "A-Z"){
                sort = { name: 1}
            }else if(sortValue === "Z-A"){
                sort = { name: -1 }
            }
        }

        


        const [data, total] = await Promise.all([
            this.userRepo.findAllUser(query, page, limit, sort),
            this.userRepo.countDocument(query),

        ])
        const resData: ResGetUser[] = data.map((user: User) => {
            return { name: user.name, email: user.email, isVerified: user.isVerified!, isBlocked: user.isBlocked! }
        })

        return { resData, total }
    }

    // async getUser(req: Request, res: Response): Promise<{ data: User[]; total: number }> {

    // }
}