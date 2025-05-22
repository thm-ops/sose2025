export type CreatePaymentRequest = {
  items: {
    name: string;
    quantity: number;
    unitAmount: {
      currencyCode: string;
      value: string;
    };
  }[];
  currencyCode: string;
  returnUrl: string;
  cancelUrl: string;
}; 