import { ObjectId } from "mongoose";

export interface ICreateNotficationDTO {
    userId: string,
    type: string,
    message: string,
    isRead: boolean,
}

export interface IResNotification {
    id: string,
    message: string,
    isRead: boolean
}