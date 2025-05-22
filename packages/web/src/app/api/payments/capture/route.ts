import { PaymentController } from '@/domain/payments/controllers/payment.controller';

const controller = new PaymentController();

export async function POST(request: Request) {
  return controller.capturePayment(request);
} 