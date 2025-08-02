import { Schema, model, Document, ObjectId } from "mongoose";


interface IResetPassword extends Document {
    userId: ObjectId,
    token: string,
    expire: Date,
    used: boolean
}

const resetPasswordSchema = new Schema<IResetPassword>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    token: { type: String, required: true },
    expire: { type: Date, required: true },
    used: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const ResetPasswordModel = model<IResetPassword>('ResetPassword',resetPasswordSchema)

export default ResetPasswordModel