'use client';

export default function PaymentCancel() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md text-center">
        <h1 className="text-2xl font-bold mb-4 text-yellow-600">Payment Cancelled</h1>
        <p className="mb-4">Your payment was cancelled. No charges were made.</p>
        <a
          href="/test-payment"
          className="inline-block bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Back to Test Page
        </a>
      </div>
    </div>
  );
} 