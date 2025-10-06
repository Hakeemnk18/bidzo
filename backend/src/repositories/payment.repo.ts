import { injectable } from "tsyringe";
import { ICreatePaymentDTO } from "../dtos/payment.dto";
import { IPaymentRepo } from "./interfaces/payment.repo.interface";
import PaymentModel from "../models/payment.model";
import { Payment } from "../types/payment.type";

@injectable()
export class PaymentRepo implements IPaymentRepo{
    async create(payment: ICreatePaymentDTO): Promise<void> {
        await PaymentModel.create(payment)
    }
    async updateStatus(orderId: string, status: 'PENDING' | "SUCCESS" | 'FAILED'): Promise<Payment | null> {
        return await PaymentModel.findOneAndUpdate({orderId},{status},{new:true})
    }
}