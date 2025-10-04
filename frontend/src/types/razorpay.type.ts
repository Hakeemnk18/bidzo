export interface IRazorpayOrder {
  id: string;
  entity: string;       
  amount: number;       
  amount_paid: number;
  amount_due: number;
  currency: string;     
  receipt: string;
  status: string;       
  attempts: number;
  notes: Record<string, any>;
  created_at: number;   
}

export interface IResRazorpayCreateOrder {
    success: boolean,
    message: string,
    data:IRazorpayOrder
}

export interface IRazorpayOptions {
  key: string;
  amount: number; // in paise
  currency: string;
  name: string; // your company/app name
  description?: string;
  order_id: string; // from backend
  notes?: Record<string, any>;
  prefill?: {
    name?: string;
    email?: string;
    contact?: string;
  };
  handler: (response: {
    razorpay_payment_id: string;
    razorpay_order_id: string;
    razorpay_signature: string;
  }) => void;
}


