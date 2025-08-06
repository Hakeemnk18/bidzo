import { Request, Response } from "express";
import { IUserManagementService } from "./interfaces/user.management.interface";
import { IUserRepository } from "../repositories/interfaces/user.repo.interface";
import { CustomError } from "../utils/customError";
import { GetUsersDTO, IResProfile, ResGetUser } from "../dtos/userLogin.dto";
import { User } from "../types/userType";
import { ISendEMAIL, sendEmail } from "../utils/send.email";



export class UserMangementService implements IUserManagementService {

    constructor(private readonly userRepo: IUserRepository) { }

    async getSeller(getUser: GetUsersDTO): Promise<{ resData: ResGetUser[]; total: number }> {



        const { role, page, limit, search, sortValue, filters } = getUser
        let sort: Record<string, any> = {}
        const query: Record<string, any> = {
            role: role,
        }

        if (search && search.trim() !== "") {
            query.name = { $regex: `^${search.trim()}`, $options: 'i' };
        }

        if (Object.keys(filters).length !== 0) {
            for (let key in filters) {
                query[key] = filters[key] === "true"
            }
        }





        if (sortValue && sortValue.trim() !== "") {
            if (sortValue === "A-Z") {
                sort = { name: 1 }
            } else if (sortValue === "Z-A") {
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
        if (!user) {
            throw new CustomError('no user matched', 404)
        }
        let updateData
        if (field === 'isBlocked') {
            console.log("inside is blocked")
            updateData = await this.userRepo.blockAndunBlock(id, { isBlocked: !user.isBlocked })
        } else if (field === 'isVerified') {
            console.log("inside is verified")
            updateData = await this.userRepo.blockAndunBlock(id, { isVerified: "approved" })
            const sendMail: ISendEMAIL = {
                email: user.email,
                subject: "Account Verified",
                text: "your account is verified",
                html: "<h2>Your Seller Account is verified"
            }
            await sendEmail(sendMail)

        }


        if (updateData!.matchedCount === 0) {
            throw new CustomError('error in update ', 404)
        }
    }


    async getUserProfile(id: string): Promise<IResProfile> {

        console.log("inside service get user profile")
        const user = await this.userRepo.findById(id)
        console.log(user)
        if (!user) {
            throw new CustomError('no user matched', 404)
        }

        const userData: IResProfile = {
            name: user?.name!,
            email: user?.email!,
            phoneNumber: user?.phone!
        }

        return userData

    }

    async sellerreject(id: string, reason: string): Promise<void> {
        console.log("inside reject seller service")
        const user = await this.userRepo.findById(id)
        if (!user) {
            throw new CustomError('no user matched', 404)
        }

        const updateData = await this.userRepo.blockAndunBlock(id, { isVerified: "rejected" })
        if (updateData!.matchedCount === 0) {
            throw new CustomError('error in update ', 404)

        }
        const resetLink = `http://localhost:5173/seller/reapply?id=${id}`;

        const sendMail: ISendEMAIL = {
            email: user.email,
            subject: "Account is Rejected",
            text: `Your seller account has been rejected for the following reason: ${reason}`,
            html: `<p>Your Seller Account has been rejected</p><p><strong>Reason:</strong> ${reason}</p> <h3>Reapply ${resetLink} </h3>`
        }
        await sendEmail(sendMail)

    }

    async sellerReapply(id: string): Promise<void> {
        
        const user = await this.userRepo.findById(id)
        if (!user  || user?.isVerified !== "rejected") {
            throw new CustomError('no user matched', 404)
        }

        const updateData = await this.userRepo.blockAndunBlock(id, { isVerified: "pending" })
        if (updateData!.matchedCount === 0) {
            throw new CustomError('error in update ', 404)

        }

    }


}