export interface ReqOTP {
    email: string;
    otp: string;
    expiry: Date
}

export interface VerifyReqOTP {
    email: string;
    otp: string
}