import { Schema, Document, model } from "mongoose";

interface IUser extends Document {
    name: string,
    email: string,
    password: string,
    phone: number,
    googleId: string,
    role: "user" | "admin" | "seller"
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String,},
    phone: { type: Number},
    googleId: { type: String},
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