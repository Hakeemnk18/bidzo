import { ObjectId } from "mongoose";

export interface ICreateNotficationDTO {
    userId: string,
    type: string,
    message: string,
    isRead: boolean,
}