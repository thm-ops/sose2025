import { NextResponse } from 'next/server';
import { PayPalService } from '../services/paypal.service';
import { CreatePaymentRequest } from '../models/CreatePaymentRequest';

export class PaymentController {
  private paypalService: PayPalService;

  constructor() {
    this.paypalService = new PayPalService();
  }

  async createPayment(request: Request) {
    try {
      const body = await request.json() as CreatePaymentRequest;
      const order = await this.paypalService.createOrder(body);
      return NextResponse.json(order);
    } catch (error) {
      console.error('Error creating payment:', error);
      
      if (error instanceof Error) {
        if (error.message.includes('Items are required')) {
          return NextResponse.json(
            { error: error.message },
            { status: 400 }
          );
        }
      }

      return NextResponse.json(
        { error: 'Failed to create payment' },
        { status: 500 }
      );
    }
  }

  async capturePayment(request: Request) {
    try {
      const { orderId } = await request.json();
      if (!orderId) {
        return NextResponse.json(
          { error: 'Order ID is required' },
          { status: 400 }
        );
      }

      const order = await this.paypalService.captureOrder(orderId);
      return NextResponse.json(order);
    } catch (error) {
      console.error('Error capturing payment:', error);
      return NextResponse.json(
        { error: 'Failed to capture payment' },
        { status: 500 }
      );
    }
  }
} 