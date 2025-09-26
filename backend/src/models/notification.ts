import { Schema, Document, model, ObjectId } from "mongoose";

interface INotification extends Document {
    userId: ObjectId,
    type: string,
    message: string,
    isRead: boolean,
}


const notificationSchema = new Schema<INotification>({
    userId:{
        type: Schema.Types.ObjectId, 
        ref: 'User', 
        required: true
    },
    type:{ type: String },
    message:{ type: String},
    isRead: { type: Boolean },

},{ timestamps: true})

const NotificationModel = model<INotification>('Notification', notificationSchema)

export default NotificationModel

