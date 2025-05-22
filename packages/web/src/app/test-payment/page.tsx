'use client';

import { useState } from 'react';
import { environments } from '@/lib/environments';

export default function TestPayment() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlePayment = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch('/api/payments/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: [
            {
              name: 'Test Product',
              quantity: 1,
              unitAmount: {
                currencyCode: 'USD',
                value: '10.00',
              },
            },
          ],
          currencyCode: 'USD',
          returnUrl: `${environments.paypal.baseUrl}/payment/success`,
          cancelUrl: `${environments.paypal.baseUrl}/payment/cancel`,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to create order');
      }

      const order = await response.json();
      
      // Find the approval URL from PayPal response
      const approvalUrl = order.links.find(
        (link: { rel: string; href: string }) => link.rel === 'approve'
      )?.href;

      if (!approvalUrl) {
        throw new Error('No approval URL found');
      }

      // Redirect to PayPal
      window.location.href = approvalUrl;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create payment');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-center mb-8">Test Payment</h1>
        
        {error && (
          <div className="mb-4 p-4 bg-red-50 text-red-700 rounded-md">
            {error}
          </div>
        )}

        <button
          onClick={() => void handlePayment()}
          disabled={loading}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 disabled:bg-blue-300"
        >
          {loading ? 'Processing...' : 'Pay with PayPal'}
        </button>
      </div>
    </div>
  );
} 