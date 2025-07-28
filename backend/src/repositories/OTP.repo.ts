import { ReqOTP, VerifyReqOTP } from "../dtos/OTP.dto";
import OTPModel from "../models/otp.model";
import { OTP } from "../types/OTP.type";
import { IOTPRepository } from "./otp.repo.interface";


export class OTPRepository implements IOTPRepository {

    async create(otp: ReqOTP): Promise<OTP> {
        return await OTPModel.create(otp)
    }

    async findByEmail(email: string, otp: string): Promise<OTP | null> {
        return await OTPModel.findOne({ email, otp})
    }

    async findOneAndUpdate(otpData: ReqOTP): Promise<OTP> {
        const { email, otp, expiry } = otpData;
        return await OTPModel.findOneAndUpdate(
            {email},
            {otp, expiry},
            {upsert: true, new: true})
    }
}