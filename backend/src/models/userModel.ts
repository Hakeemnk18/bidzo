import { Schema, Document, model } from "mongoose";

interface IUser extends Document {
    name: string,
    email: string,
    password: string,
    phone: string,
    googleId: string,
    documentUrl: string
    role: "user" | "admin" | "seller",
    isVerified: "pending" | "rejected" | "approved",
    isBlocked: boolean
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String,},
    phone: { type: String},
    googleId: { type: String},
    documentUrl: { type: String},
    isVerified: { 
      type: String, 
      enum: ["pending" ,"rejected" , "approved"]
    },
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