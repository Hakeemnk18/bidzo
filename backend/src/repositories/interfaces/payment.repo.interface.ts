import { ICreatePaymentDTO } from "../../dtos/payment.dto";
import { Payment } from "../../types/payment.type";

export interface IPaymentRepo {
    create(payment: ICreatePaymentDTO): Promise<void>
    updateStatus(orderId: string, status: 'PENDING' | "SUCCESS" | 'FAILED'): Promise<Payment | null>
}