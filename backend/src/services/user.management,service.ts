import { Request, Response } from "express";
import { IUserManagementService } from "./interfaces/user.management.interface";
import { IUserRepository } from "../repositories/user.repo.interface";

import {  GetUsersDTO, ResGetUser } from "../dtos/userLogin.dto";
import { User } from "../types/userType";



export class UserMangementService implements IUserManagementService {

    constructor(private readonly userRepo: IUserRepository) { }

    async getSeller(getUser: GetUsersDTO): Promise<{ resData: ResGetUser[]; total: number }> {



        const { role, page, limit, search } = getUser
        const query: any = {
            role: role,
        }

        if (search && search.trim() !== "") {
            query.name = { $regex: search, $options: 'i' };
        }



        const [data, total] = await Promise.all([
            this.userRepo.findAllUser(query, page, limit),
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