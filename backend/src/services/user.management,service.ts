import { Request, Response } from "express";
import { IUserManagementService } from "./interfaces/user.management.interface";
import { IUserRepository } from "../repositories/interfaces/user.repo.interface";
import { CustomError } from "../utils/customError";
import { GetUsersDTO, IResProfile, ResGetUser } from "../dtos/userLogin.dto";
import { User } from "../types/userType";
import { ISendEMAIL, sendEmail } from "../utils/send.email";
import { HttpStatusCode } from "../constants/httpStatusCode";
import { ResponseMessages } from "../constants/responseMessages";
import { injectable, inject } from "tsyringe";
import { UpdateUserDTO } from "../dtos/editUser.dto";
import { validateUserUpdate } from "../utils/userValidation";
import { comparePassword, hashPassword } from "../utils/hash";
import { INotificationRepo } from "../repositories/interfaces/notification.repo.interface";
import { INotificationService } from "./interfaces/notification.interfaces";
import { ICreateNotficationDTO } from "../dtos/notification.dto";
import { io } from "../app";



@injectable()
export class UserMangementService implements IUserManagementService {

    constructor(
        @inject('IUserRepository') private readonly userRepo: IUserRepository,
        @inject('INotificationService') private readonly notificationService: INotificationService
    ) { }

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
            return {
                id: user.id!,
                name: user.name,
                email: user.email,
                isVerified: user.isVerified!,
                isBlocked: user.isBlocked!,
                documentUrl: user.documentUrl
            }
        })

        return { resData, total }
    }

    async blockAndUnBlock(id: string, field: string): Promise<void> {

        const user = await this.userRepo.findById(id)
        if (!user) {
            throw new CustomError(ResponseMessages.USER_NOT_FOUND, HttpStatusCode.NOT_FOUND)
        }
        let updateData
        if (field === 'isBlocked') {

            updateData = await this.userRepo.findByidAndUpdate(id, { isBlocked: !user.isBlocked })
        } else if (field === 'isVerified') {

            updateData = await this.userRepo.findByidAndUpdate(id, { isVerified: "approved" })
            const sendMail: ISendEMAIL = {
                email: user.email,
                subject: "Account Verified",
                text: "your account is verified",
                html: "<h2>Your Seller Account is verified"
            }
            await sendEmail(sendMail)

        }


        if (updateData!.matchedCount === 0) {
            throw new CustomError('error in update ', HttpStatusCode.NOT_FOUND)
        }
    }


    async getUserProfile(id: string): Promise<IResProfile> {

        
        const user = await this.userRepo.findById(id)

        if (!user) {
            throw new CustomError(ResponseMessages.USER_NOT_FOUND, HttpStatusCode.NOT_FOUND)
        }

        const userData: IResProfile = {
            name: user?.name!,
            email: user?.email!,
            phoneNumber: user?.phone!
        }

        return userData

    }

    async sellerreject(id: string, reason: string): Promise<void> {
       
        const user = await this.userRepo.findById(id)
        if (!user) {
            throw new CustomError(ResponseMessages.USER_NOT_FOUND, HttpStatusCode.NOT_FOUND)
        }

        const updateData = await this.userRepo.findByidAndUpdate(id, { isVerified: "rejected" })
        if (updateData!.matchedCount === 0) {
            throw new CustomError('error in update ', HttpStatusCode.NOT_FOUND)

        }
        const resetLink = `http://localhost:5173/seller/reapply?id=${id}`;

        const sendMail: ISendEMAIL = {
            email: user.email,
            subject: "Account is Rejected",
            text: `Your seller account has been rejected for the following reason: ${reason}`,
            html: `<p>Your Seller Account has been rejected</p><p><strong>Reason:</strong> ${reason}</p> <h3>Reapply ${resetLink} </h3>`
        }
        await sendEmail(sendMail)

        const notification: ICreateNotficationDTO = {
            userId: user.id!,
            message: "Your seller account has been rejected",
            type: "important",
            isRead: false
        }
        const not = { message: "Your seller account has been rejected" }
        await this.notificationService.create(notification)
        io.to(user.id!).emit("notification", not);

    }

    async sellerReapply(id: string, documentUrl: string): Promise<void> {

        const user = await this.userRepo.findById(id)
        if (!user || user?.isVerified !== "rejected") {
            throw new CustomError(ResponseMessages.USER_NOT_FOUND, HttpStatusCode.NOT_FOUND)
        }

        if (user.submitCount === 3) {
            throw new CustomError(ResponseMessages.SUBMITION_LIMIT, HttpStatusCode.TOO_MANY_REQUEST)
        }
        const count = user.submitCount! + 1

        const updateData = await this.userRepo.findByidAndUpdate(id, { isVerified: "pending", documentUrl, submitCount: count })
        if (updateData!.matchedCount === 0) {
            throw new CustomError(ResponseMessages.USER_NOT_FOUND, HttpStatusCode.NOT_FOUND)

        }

    }

    async userUpdate(userData: UpdateUserDTO): Promise<void> {
        validateUserUpdate(userData)
        console.log("inside user update service")
        const { id, name, phone } = userData
        const updateData = await this.userRepo.findByidAndUpdate(id, { name, phone })
        if (updateData!.matchedCount === 0) {
            throw new CustomError(ResponseMessages.USER_NOT_FOUND, HttpStatusCode.NOT_FOUND)

        }
        const not = { message: "Your seller account has been rejected"}
        
        io.to(id).emit("notification", not);
    }

    async passwordMatch(password: string, _id: string): Promise<boolean> {


        const user = await this.userRepo.findOne({ _id })
        if (!user) return false;

        const isMatch = await comparePassword(password, user?.password!)
        return isMatch
    }


    async changePassword(id: string, password: string): Promise<void> {
        const hashPsd = await hashPassword(password)
        const user = await this.userRepo.resetPassword(id, hashPsd)

        if (!user) {
            throw new CustomError(ResponseMessages.USER_NOT_FOUND, HttpStatusCode.NOT_FOUND)
        }
    }


}