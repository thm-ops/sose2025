export type PaymentItem = {
  name: string;
  quantity: number;
  unitAmount: {
    currencyCode: string;
    value: string;
  };
}; 