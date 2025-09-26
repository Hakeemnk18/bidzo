import { ICreateNotficationDTO } from "../../dtos/notification.dto";

export interface INotificationRepo {
    create(data: ICreateNotficationDTO):Promise<void>
}