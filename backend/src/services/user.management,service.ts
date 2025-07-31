import { Request, Response } from "express";
import { IUserManagementService } from "./interfaces/user.management.interface";
import { IUserRepository } from "../repositories/user.repo.interface";

import {  GetUsersDTO, ResGetUser } from "../dtos/userLogin.dto";
import { User } from "../types/userType";



export class UserMangementService implements IUserManagementService {

    constructor(private readonly userRepo: IUserRepository) { }

    async getSeller(getUser: GetUsersDTO): Promise<{ resData: ResGetUser[]; total: number }> {



        const { role, page, limit, search, filter, filterField, sortValue } = getUser
        let sort:Record<string, any > = {}
        const query: Record<string, any > = {
            role: role,
        }

        if (search && search.trim() !== "") {
            query.name = { $regex: `^${search.trim()}`, $options: 'i' };
        }

        if(filterField && filterField.trim() !== ""){
            if(filter && filter.trim() !== ""){
                if(filterField === "isVerified"){
                    query[filterField] = filter === "true"
                }
            }
        }

        if(sortValue && sortValue.trim() !== ""){
            if(sortValue === "A-Z"){
                sort = { name: 1}
            }else if(sortValue === "Z-A"){
                sort = { name: -1 }
            }
        }

        //console.log("query ",query)


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