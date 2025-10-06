import { inject, injectable } from "tsyringe";
import { ICreatePaymentDTO } from "../dtos/payment.dto";
import { IPaymentService } from "./interfaces/payment.interface";
import { IPaymentRepo } from "../repositories/interfaces/payment.repo.interface";
import { Payment } from "../types/payment.type";


@injectable()
export class PaymentService implements IPaymentService {
    constructor(
        @inject('IPaymentRepo')private readonly paymentRepo: IPaymentRepo
    ){}
    async create(payment: ICreatePaymentDTO): Promise<void> {
        await this.paymentRepo.create(payment)
    }
    async updateStatus(orderId: string, status: "PENDING" | "SUCCESS" | "FAILED"): Promise<Payment | null> {
        return await this.paymentRepo.updateStatus(orderId,status)
    }
}