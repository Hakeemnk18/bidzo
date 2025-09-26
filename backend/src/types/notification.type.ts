import { ObjectId } from "mongoose"


export type Notification =  {
    id?: string
    userId: string,
    type: string,
    message: string,
    isRead: boolean,
    createdAt?: Date;
    updatedAt?: Date;
}