import { OTP } from "../../types/OTP.type"
import { ReqOTP, VerifyReqOTP } from "../../dtos/OTP.dto"


export interface IOTPRepository {
    create(otp: ReqOTP):Promise<OTP>
    findByEmail(email: string, otp: string):Promise<OTP | null>
    findOneAndUpdate(otpData: ReqOTP):Promise<OTP>
}