'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { PayPalOrder, PayPalItem } from '@/types/paypal';
import { ShoppingCartItem } from "@/app/cart/cart.component";
import { rubberDuckData } from "@/data/data";

/**
 * API response when an order is successfully retrieved.
 */
interface OrderResponse {
    order: PayPalOrder;
}

/**
 * API response in case of an error.
 */
interface ErrorResponse {
    error: string;
}

/**
 * @page OrderConfirmationPage
 * @description
 * React page that displays the confirmation details of a PayPal order.
 * Route: `/order-confirmation/[orderId]`
 *
 * It fetches the PayPal order using its ID, then displays:
 * - Order status
 * - Ordered items with subtotal
 * - Shipping cost
 * - Taxes and total
 *
 * Includes error handling and loading states.
 *
 * @returns {JSX.Element} The order confirmation page.
 */
export default function OrderConfirmationPage(){
    const params = useParams();
    const orderId = params.orderId as string;

    /** PayPal order object retrieved from the API */
    const [orderDetails, setOrderDetails] = useState<PayPalOrder | null>(null);

    /** Local representation of the order items (mapped for display) */
    const [orderItems, setOrderItems] = useState<ShoppingCartItem[]>([]);

    /** Loading state while fetching order */
    const [loading, setLoading] = useState<boolean>(true);

    /** Error message if the API request fails */
    const [error, setError] = useState<string | null>(null);

    /** Flag to ensure this only runs client-side */
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    /**
     * Type guard: checks if data is `OrderResponse`.
     */
    const isOrderResponse = (data: unknown): data is OrderResponse => {
        return (
            typeof data === 'object' &&
            data !== null &&
            'order' in data &&
            typeof (data as OrderResponse).order === 'object'
        );
    };

    /**
     * Type guard: checks if data is `ErrorResponse`.
     */
    const isErrorResponse = (data: unknown): data is ErrorResponse => {
        return (
            typeof data === 'object' &&
            data !== null &&
            'error' in data
        );
    };

    /**
     * Type guard: checks if data is `PayPalItem`.
     */
    const isPayPalItem = (item: unknown): item is PayPalItem => {
        return (
            typeof item === 'object' &&
            item !== null &&
            'name' in item &&
            'unit_amount' in item &&
            'quantity' in item
        );
    };

    /**
     * Fetches order details from the backend API (`/orders/[orderId]`).
     * Handles both success (PayPal order returned) and error states.
     */
    useEffect(() => {
        async function fetchOrderDetails() {
            if (!orderId) return;

            try {
                setLoading(true);
                setError(null);

                const response = await fetch(`/orders/${orderId}`); // <- Must match your API route
                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.error || `HTTP error! status: ${response.status}`);
                }

                console.log("Order data received:", data.order);

                setOrderDetails(data.order);


            } catch (err) {
                console.error("Error fetching order details:", err);
                setError(err instanceof Error ? err.message : "Unable to fetch order details.");
            } finally {
                setLoading(false);
            }
        }

        if (isClient) {
            fetchOrderDetails();
        }
    }, [orderId, isClient]);

    /**
     * Calculate subtotal, shipping, tax and total values.
     */
    const subtotal = orderItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const shipping = 500;          // Fixed 5.00 € shipping cost
    const tax = subtotal * 0.19;   // 19% VAT
    const orderTotal = subtotal + shipping + tax;

    // === UI States ===
    if (loading) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="max-w-2xl mx-auto">
                    <div className="animate-pulse">
                        <div className="h-8 bg-gray-200 rounded w-1/2 mb-4"></div>
                        <div className="h-64 bg-gray-200 rounded"></div>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="max-w-2xl mx-auto">
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                        <h2 className="text-lg font-semibold text-red-800 mb-2">Error</h2>
                        <p className="text-red-700">{error}</p>
                    </div>
                </div>
            </div>
        );
    }

    // === Main Render ===
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-2xl mx-auto">
                <h1 className="text-3xl font-bold text-center mb-8">
                    Order Confirmation
                </h1>

                {orderDetails && (
                    <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
                        <h2 className="text-xl font-semibold mb-4">
                            Order #{orderDetails.id}
                        </h2>
                        <p className="text-gray-600 mb-4">
                            Status: <span className="font-semibold">{orderDetails.status}</span>
                        </p>

                        {orderItems.length > 0 && (
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold">Ordered Items:</h3>
                                {orderItems.map((item, index) => (
                                    <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                                        <div>
                                            <h4 className="font-medium">{item.name}</h4>
                                            <p className="text-sm text-gray-600">
                                                Quantity: {item.quantity}
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-semibold">
                                                {(item.price * item.quantity / 100).toFixed(2)} €
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Totals */}
                        <div className="mt-6 pt-6 border-t">
                            <div className="space-y-2">
                                <div className="flex justify-between">
                                    <span>Subtotal:</span>
                                    <span>{(subtotal / 100).toFixed(2)} €</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Shipping:</span>
                                    <span>{(shipping / 100).toFixed(2)} €</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>VAT (19%):</span>
                                    <span>{(tax / 100).toFixed(2)} €</span>
                                </div>
                                <div className="flex justify-between font-bold text-lg border-t pt-2">
                                    <span>Total:</span>
                                    <span>{(orderTotal / 100).toFixed(2)} €</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}