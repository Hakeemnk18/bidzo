import { ICreateNotficationDTO } from "../../dtos/notification.dto";

export interface INotificationService {
    create(data:ICreateNotficationDTO):Promise<void>
}