import { environments } from '@/lib/environments';
import { CreatePaymentRequest } from '../models/CreatePaymentRequest';
import { PayPalOrderResponse } from '../models/PayPalOrderResponse';
import { PayPalErrorResponse } from '../models/PayPalErrorResponse';

export class PayPalService {
  private readonly apiBaseUrl: string;
  private readonly clientId: string;
  private readonly clientSecret: string;

  constructor() {
    const { apiBaseUrl, clientId, clientSecret } = environments.paypal;
    if (!clientId || !clientSecret) {
      throw new Error('PayPal credentials are not configured');
    }
    this.apiBaseUrl = apiBaseUrl;
    this.clientId = clientId;
    this.clientSecret = clientSecret;
  }

  private async getAccessToken(): Promise<string> {
    const auth = Buffer.from(`${this.clientId}:${this.clientSecret}`).toString('base64');
    
    const response = await fetch(`${this.apiBaseUrl}/v1/oauth2/token`, {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${auth}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: 'grant_type=client_credentials',
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null) as PayPalErrorResponse;
      throw new Error(`Failed to get PayPal access token: ${errorData.error_description}`);
    }

    const { access_token } = await response.json();
    return access_token;
  }

  async createOrder(request: CreatePaymentRequest): Promise<PayPalOrderResponse> {
    if (!request.items.length) {
      throw new Error('Items are required');
    }

    const orderData = {
      intent: 'CAPTURE',
      purchase_units: [{
        items: request.items.map(item => ({
          name: item.name,
          quantity: item.quantity,
          unit_amount: {
            currency_code: item.unitAmount.currencyCode,
            value: item.unitAmount.value,
          },
        })),
        amount: {
          currency_code: request.currencyCode,
          value: request.items.reduce((total, item) => 
            total + (parseFloat(item.unitAmount.value) * item.quantity), 0).toFixed(2),
          breakdown: {
            item_total: {
              currency_code: request.currencyCode,
              value: request.items.reduce((total, item) => 
                total + (parseFloat(item.unitAmount.value) * item.quantity), 0).toFixed(2)
            }
          }
        },
      }],
      application_context: {
        return_url: request.returnUrl,
        cancel_url: request.cancelUrl,
      },
    };

    const accessToken = await this.getAccessToken();

    const response = await fetch(`${this.apiBaseUrl}/v2/checkout/orders`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null) as PayPalErrorResponse;
      throw new Error(`Failed to create PayPal order: ${JSON.stringify(errorData)}`);
    }

    return response.json();
  }

  async captureOrder(orderId: string): Promise<PayPalOrderResponse> {
    const accessToken = await this.getAccessToken();

    const response = await fetch(`${this.apiBaseUrl}/v2/checkout/orders/${orderId}/capture`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null) as PayPalErrorResponse;
      throw new Error(`Failed to capture PayPal order: ${JSON.stringify(errorData)}`);
    }

    return response.json();
  }
} 