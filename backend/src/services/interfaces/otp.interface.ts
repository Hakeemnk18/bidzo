import { ReqOTP, VerifyReqOTP } from "../../dtos/OTP.dto";
import { OTP } from "../../types/OTP.type";

export interface IOTPService {
    saveOTP(otp: ReqOTP):Promise<void>
    verifyOtp(otpData: VerifyReqOTP): Promise< OTP | null>
    saveAndUpdate(otpData: ReqOTP): Promise<void> 
}