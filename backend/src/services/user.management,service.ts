import { Request, Response } from "express";
import { IUserManagementService } from "./interfaces/user.management.interface";
import { IUserRepository } from "../repositories/interfaces/user.repo.interface";
import { CustomError } from "../utils/customError";
import {  GetUsersDTO, ResGetUser } from "../dtos/userLogin.dto";
import { User } from "../types/userType";
import { ISendEMAIL, sendEmail } from "../utils/send.email";



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
            return { id: user.id!, name: user.name, email: user.email, isVerified: user.isVerified!, isBlocked: user.isBlocked! }
        })

        return { resData, total }
    }

    async blockAndUnBlock(id: string, field: string): Promise<void> {

        const user = await this.userRepo.findById(id)

        if(!user){
            throw new CustomError('no user matched', 404)
        }
        let updateData
        if(field === 'isBlocked'){
            console.log("inside is blocked")
            updateData = await this.userRepo.blockAndunBlock(id,{ isBlocked: !user.isBlocked})
        }else if(field === 'isVerified'){
            console.log("inside is verified")
            updateData = await this.userRepo.blockAndunBlock(id,{ isVerified: true})
            const sendMail: ISendEMAIL = {
                email: user.email,
                subject: "Account Verified",
                text: "your account is verified",
                html: "<h2>Your Seller Account is verified"
            }
            await sendEmail(sendMail)
        }
        

        if(updateData!.matchedCount === 0){
            throw new CustomError('error in update ', 404)
        }
    }
    
}