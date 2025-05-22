import { PaymentController } from '@/domain/payments/controllers/payment.controller';

const paymentController = new PaymentController();

export async function POST(request: Request) {
  return paymentController.createPayment(request);
} 