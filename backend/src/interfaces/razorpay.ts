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

export interface IRazorpayOrderOptions {
  amount: number; 
  currency: string; 
  receipt: string; 
  notes?: {
    planId: string;
    billing: string;
    [key: string]: any; 
  };
}

export interface IRazorpayPayment {
  id: string;
  entity: string;
  amount: number;
  currency: string;
  status: 'created' | 'authorized' | 'captured' | 'refunded' | 'failed';
  order_id?: string;
  invoice_id?: string;
  international: boolean;
  method: string;
  amount_refunded: number;
  refund_status: string | null;
  captured: boolean;
  description?: string;
  card_id?: string;
  bank?: string;
  wallet?: string;
  vpa?: string;
  email: string;
  contact: string;
  notes?: Record<string, any>;
  fee?: number;
  tax?: number;
  error_code?: string;
  error_description?: string;
  created_at: number;
}

