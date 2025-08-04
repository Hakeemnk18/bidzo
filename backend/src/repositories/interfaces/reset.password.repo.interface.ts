import { ResetPassword } from "../../types/reset.password.type";



export interface IResetPasswordRepo {
    create(psd: ResetPassword): Promise<void>;
    validate(token: string): Promise<ResetPassword | null>;
    markUsed(id: string): Promise<void>
}