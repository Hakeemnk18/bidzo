import ResetPasswordModel from "../models/reset.password.model";
import { ResetPassword } from "../types/reset.password.type";
import { IResetPasswordRepo } from "./interfaces/reset.password.repo.interface";


export class ResetRepo implements IResetPasswordRepo {
    async create(psd: ResetPassword): Promise<void> {
        ResetPasswordModel.create(psd)
    }

    async validate(token: string): Promise<ResetPassword | null> {

        return await ResetPasswordModel.findOne({
            token,
            expire: { $gt: new Date() },
            used: false 
        });
    }

    async markUsed(id: string): Promise<void> {
        await ResetPasswordModel.findByIdAndUpdate(id,{ used: true})
    }

    
}