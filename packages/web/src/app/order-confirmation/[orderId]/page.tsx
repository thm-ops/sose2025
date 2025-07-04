// src/app/order-confirmation/[orderId]/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { PayPalOrder, PayPalItem } from '@/types/paypal';
import {ShoppingCartItem} from "@/app/cart/cart.component";
import {rubberDuckData} from "@/data/data";


// Add a type for the API response
interface OrderResponse {
    order: PayPalOrder;
}

interface ErrorResponse {
    error: string;
}

export default function OrderConfirmationPage() {
    const params = useParams();
    const orderId = params.orderId as string;

    const [orderDetails, setOrderDetails] = useState<PayPalOrder | null>(null);
    const [orderItems, setOrderItems] = useState<ShoppingCartItem[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    // Type guard function to check if response is an order
    const isOrderResponse = (data: unknown): data is OrderResponse => {
        return (
            typeof data === 'object' &&
            data !== null &&
            'order' in data &&
            typeof (data as OrderResponse).order === 'object'
        );
    };

    // Type guard function to check if response is an error
    const isErrorResponse = (data: unknown): data is ErrorResponse => {
        return (
            typeof data === 'object' &&
            data !== null &&
            'error' in data &&
            true
        );
    };

    // Type guard for PayPal items
    const isPayPalItem = (item: unknown): item is PayPalItem => {
        return (
            typeof item === 'object' &&
            item !== null &&
            'name' in item &&
            'unit_amount' in item &&
            'quantity' in item
        );
    };

// src/app/order-confirmation/[orderId]/page.tsx
    useEffect(() => {
        async function fetchOrderDetails() {
            if (!orderId) return;

            try {
                setLoading(true);
                setError(null);

                const response = await fetch(`/orders/${orderId}`); // <- Cette URL doit correspondre à votre route
                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.error || `HTTP error! status: ${response.status}`);
                }

                console.log("Order data received:", data.order);
                setOrderDetails(data.order);

                // Traiter les articles...
            } catch (err) {
                console.error("Error fetching order details:", err);
                setError(err instanceof Error ? err.message : "Impossible de récupérer les détails de la commande.");
            } finally {
                setLoading(false);
            }
        }

        if (isClient) {
            fetchOrderDetails();
        }
    }, [orderId, isClient]);
    // Calculate totals
    const subtotal = orderItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const shipping = 500; // 5,00 €
    const tax = subtotal * 0.19; // 19% TVA
    const orderTotal = subtotal + shipping + tax;

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
                        <h2 className="text-lg font-semibold text-red-800 mb-2">Erreur</h2>
                        <p className="text-red-700">{error}</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-2xl mx-auto">
                <h1 className="text-3xl font-bold text-center mb-8">
                    Bestätigung der Bestellung
                </h1>

                {orderDetails && (
                    <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
                        <h2 className="text-xl font-semibold mb-4">
                            Commande #{orderDetails.id}
                        </h2>
                        <p className="text-gray-600 mb-4">
                            Statut: <span className="font-semibold">{orderDetails.status}</span>
                        </p>

                        {orderItems.length > 0 && (
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold">Articles commandés:</h3>
                                {orderItems.map((item, index) => (
                                    <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                                        <div>
                                            <h4 className="font-medium">{item.name}</h4>
                                            <p className="text-sm text-gray-600">
                                                Quantité: {item.quantity}
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

                        <div className="mt-6 pt-6 border-t">
                            <div className="space-y-2">
                                <div className="flex justify-between">
                                    <span>Sous-total:</span>
                                    <span>{(subtotal / 100).toFixed(2)} €</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Frais de port:</span>
                                    <span>{(shipping / 100).toFixed(2)} €</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>TVA (19%):</span>
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