import { ObjectId } from "mongoose"

export type ResetPassword = {
    id?:string
    userId: string,
    token: string,
    expire: Date,
    used: boolean,
    createdAt?: Date;
    updatedAt?: Date;

}