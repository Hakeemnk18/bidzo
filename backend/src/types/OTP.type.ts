
export type OTP = {
    id?: string
    email: string;
    otp: string;
    expiry: Date;
    createdAt?: Date;
    updatedAt?: Date;
}