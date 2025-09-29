import { Request, Response } from "express";
import { AuthenticatedRequest } from "../../interfaces/AuthenticatedRequest";
import { IUserNotificationController } from "./interfaces/user.notification.interface";
import { inject, injectable } from "tsyringe";
import { INotificationService } from "../../services/interfaces/notification.interfaces";
import { HttpStatusCode } from "../../constants/httpStatusCode";
import { ResponseMessages } from "../../constants/responseMessages";
import { handleError } from "../../utils/customError";
import { NotificationMapper } from "../../mappers/notification.mapper";


@injectable()
export class UserNotificationController implements IUserNotificationController {

    constructor(
        @inject('INotificationService') private readonly notificationService: INotificationService
    ) { }

    async getAll(req: AuthenticatedRequest, res: Response): Promise<void> {
        try {
            
            const { id } = req.user!
            const notifications = await this.notificationService.getAll(id)
            const resNotification = NotificationMapper.toResNotificationDTO(notifications)
            res.status(HttpStatusCode.OK).json({
                success: true,
                message: ResponseMessages.SUCCESS,
                data: resNotification
            })
        } catch (err) {
            handleError(res, err)
            //console.log("error in user edit controlled ", err)
        }

    }

    async markAsRead(req: Request, res: Response): Promise<void> {
        try {
            console.log("inside noti mark as read")
            const { id } = req.params
            console.log("id ",id)
            await this.notificationService.markAsRead(id)
            res.status(HttpStatusCode.OK).json({
                success: true,
                message: ResponseMessages.SUCCESS,   
            })
        } catch (err) {
            handleError(res, err)
            console.log("error in user mark as read notification ", err)
        }
    }
}