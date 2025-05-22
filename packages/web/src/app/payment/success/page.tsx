'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

interface PayPalErrorResponse {
  message?: string;
}

interface PayPalCaptureResponse {
  id: string;
}

export default function PaymentSuccess() {
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const capturePayment = async () => {
      try {
        // PayPal returns the order ID as 'token' in the URL
        const orderId = searchParams.get('token');
        if (!orderId) {
          throw new Error('No order ID found in URL');
        }

        const response = await fetch('/api/payments/capture', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ orderId }),
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => null) as PayPalErrorResponse;
          throw new Error(errorData?.message || 'Failed to capture payment');
        }

        const data = await response.json() as PayPalCaptureResponse;
        if (!data.id) {
          throw new Error('Invalid payment capture response');
        }

        setStatus('success');
      } catch (err) {
        console.error('Payment capture error:', err);
        setStatus('error');
        setError(err instanceof Error ? err.message : 'Something went wrong');
      }
    };

    void capturePayment();
  }, [searchParams]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md text-center">
        {status === 'loading' && (
          <>
            <h1 className="text-2xl font-bold mb-4">Processing Payment...</h1>
            <p>Please wait while we confirm your payment.</p>
          </>
        )}

        {status === 'success' && (
          <>
            <h1 className="text-2xl font-bold mb-4 text-green-600">Payment Successful!</h1>
            <p>Thank you for your purchase.</p>
            <a
              href="/test-payment"
              className="mt-4 inline-block bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            >
              Back to Test Page
            </a>
          </>
        )}

        {status === 'error' && (
          <>
            <h1 className="text-2xl font-bold mb-4 text-red-600">Payment Failed</h1>
            <p className="text-red-500 mb-4">{error}</p>
            <a
              href="/test-payment"
              className="inline-block bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            >
              Try Again
            </a>
          </>
        )}
      </div>
    </div>
  );
} 