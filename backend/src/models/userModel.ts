import { Schema, Document, model } from "mongoose";

interface IUser extends Document {
    name: string,
    email: string,
    password: string,
    phone: number,
    googleId: string,
    role: "user" | "admin" | "seller",
    isVerified: boolean,
    isBlocked: boolean
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String,},
    phone: { type: Number},
    googleId: { type: String},
    isVerified: { type: Boolean, default:false},
    isBlocked: { type: Boolean, default:false},
    role: { 
      type: String,
      enum: ["user", "admin", "seller"],
    }
  },
  {
    timestamps: true, 
  }
);


const UserModel = model<IUser>('User', userSchema);
export default UserModel;