import { Schema, Document, model, ObjectId } from "mongoose";

interface INotification extends Document {
    userId: ObjectId,
    type: string,
    title: string,
    message: string,
    link: string,
    isRead: boolean,
    isSeen: boolean,
    method: string[],

}


const notificationSchema = new Schema<INotification>({
    userId:{
        type: Schema.Types.ObjectId, 
        ref: 'User', 
        required: true
    },
    type:{ type: String },
    title: { type: String },
    message:{ type: String},
    link: { type: String},
    isRead: { type: Boolean },
    isSeen: { type: Boolean },
    method: { type: [String]}

},{ timestamps: true})

const NotificationModel = model<INotification>('Notification', notificationSchema)

export default NotificationModel

