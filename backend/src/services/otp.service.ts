import { ReqOTP, VerifyReqOTP } from "../dtos/OTP.dto";
import { IOTPRepository } from "../repositories/interfaces/otp.repo.interface";
import { OTP } from "../types/OTP.type";
import { IOTPService } from "./interfaces/otp.interface";
import { injectable, inject } from 'tsyringe';


@injectable()
export class OTPService implements IOTPService {
    constructor(
        @inject('IOTPRepository') private readonly otpRepository: IOTPRepository
    ) {}

    async saveOTP(otp: ReqOTP): Promise<void> {
        await this.otpRepository.create(otp)
    }

    async verifyOtp(otpData: VerifyReqOTP): Promise< OTP | null> {
        const { email, otp} = otpData
        return await this.otpRepository.findByEmail(email, otp)
    }

    async saveAndUpdate(otpData: ReqOTP): Promise<void> {
        await this.otpRepository.findOneAndUpdate(otpData)
    }
}