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
