import { ICreatePaymentDTO } from "../../dtos/payment.dto";
import { Payment } from "../../types/payment.type";

export interface IPaymentService {
    create(payment: ICreatePaymentDTO): Promise<void>
    updateStatus(orderId: string, status: 'PENDING' | "SUCCESS" | 'FAILED'): Promise<Payment | null>
}