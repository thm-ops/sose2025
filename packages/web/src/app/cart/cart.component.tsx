"use client";

import React, { useState, useEffect, FormEvent } from "react";
import Image from "next/image";
import { Utils } from "@/lib/utils/mod";
import useCart from "@/lib/hooks/cart/useCart.hook";
import RubberDuck from "@/lib/model/rubberduck/Rubberduck.type";
import { fetchProductsForCart } from "./fetchProductsForCart.function";
import { useRouter } from 'next/navigation';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

export type ShoppingCartItem = RubberDuck & {
    quantity: number;
    inStock: boolean;
};

export default function ShoppingCart() {
    const router = useRouter();
    const [cart, setCart] = useCart();
    const [isClient, setIsClient] = useState(false);
    const [items, setItems] = useState<ShoppingCartItem[]>([]);
    const [showPayPal, setShowPayPal] = useState(false);

    const handleQuantityChange = (id: number, delta: number) => {
        const currentItem = cart.find((item) => item.id === id);
        if (currentItem !== undefined) {
            const currentQty = currentItem.qty + delta;
            setCart([...cart.filter((item) => item.id !== id), { id, qty: currentQty }]);
        }
    };

    useEffect(() => {
        setItems(fetchProductsForCart(cart).sort((a, b) => a.id - b.id));
    }, [cart]);

    useEffect(() => {
        setIsClient(true);
    }, []);

    // Calculating the subtotal
    const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const shipping = 500; // 5,00 €
    const tax = subtotal * 0.19; // assuming: 19% tax.
    const orderTotal = subtotal + shipping + tax;

    // PayPal configuration
    const initialOptions = {
        clientId:  "AaSSId07SE-NneCnC6AntNjZS2Km5889IOj-3YC6KPv0gDE05aIUEHi5VyalbTKtHZGdkjyMWXW2LpEE",
        currency: "EUR",
        intent: "capture",
    };

    // Create PayPal order
    const createOrder = async () => {
        try {
            const response = await fetch('/paypal', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    action: 'create-order',
                    cart: cart,
                }),
            });


            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            return data.id as string; // Return the order ID from the response
        } catch (error) {
            console.error('Error creating PayPal order:', error);
            throw error;
        }
    };

    // Handle PayPal approval
// Dans votre composant ShoppingCart
    const onApprove = async (data: any) => {
        try {
            console.log('=== PAYPAL APPROVAL ===');
            console.log('Order ID:', data.orderID);

            // Récupérer les détails de la commande AVANT la capture
            const orderDetailsResponse = await fetch(`/orders/${data.orderID}`);
            let orderDetails = null;

            if (orderDetailsResponse.ok) {
                const orderData = await orderDetailsResponse.json();
                orderDetails = orderData.order;
                console.log('Order details before capture:', orderDetails);
            }

            // Capturer la commande
            const response = await fetch('/paypal', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    action: 'capture-order',
                    orderId: data.orderID,
                    orderDetails: orderDetails // Passer les détails
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error('Capture error:', errorData);
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const captureData = await response.json();
            console.log('Payment captured successfully:', captureData);

            // Clear cart after successful payment
            setCart([]);

            // Redirect to order confirmation
            router.push(`/order-confirmation/${data.orderID}`);
        } catch (error) {
            console.error('Error capturing payment:', error);
            alert('Payment capture failed. Please try again.');
        }
    };
    const handleProceedToPayment = () => {
        if (items.length === 0) {
            alert('Your cart is empty!');
            return;
        }
        setShowPayPal(true);
    };

    return (
        <main className="mx-auto max-w-2xl px-4 pt-16 pb-24 sm:px-6 lg:max-w-7xl lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Warenkorb</h1>

            <div className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
                <section aria-labelledby="cart-heading" className="lg:col-span-7">
                    <h2 id="cart-heading" className="sr-only">
                        Ware in deinem Warenkorb
                    </h2>

                    {items.length === 0 ? (
                        <div className="text-center py-12">
                            <p className="text-gray-500">Ihr Warenkorb ist leer</p>
                        </div>
                    ) : (
                        <ul role="list" className="divide-y divide-gray-200 border-t border-b border-gray-200">
                            {items.map((product) => (
                                <li key={product.id} className="flex py-6 sm:py-10">
                                    <div className="shrink-0">
                                        <Image
                                            alt="Product image"
                                            src="https://picsum.photos/800/450"
                                            width={100}
                                            height={100}
                                            className="size-10 rounded-md object-cover sm:size-25"
                                        />
                                    </div>

                                    <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                                        <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                                            <div>
                                                <div className="flex justify-between">
                                                    <h3 className="text-sm">
                                                        <a
                                                            href={"/items/" + product.id}
                                                            className="font-medium text-gray-700 hover:text-gray-800">
                                                            {product.name}
                                                        </a>
                                                    </h3>
                                                </div>
                                                <div className="mt-1 flex text-sm">
                                                    <p className="text-gray-500">{product.color}</p>
                                                    {product.size && (
                                                        <p className="ml-4 border-l border-gray-200 pl-4 text-gray-500">{product.size}</p>
                                                    )}
                                                </div>
                                                <p className="mt-1 text-sm font-medium text-gray-900">{Utils.price.display(product.price)}</p>
                                                <div className="mt-1 flex text-sm">
                                                    <div key={product.id} className="flex items-center gap-2 mb-4">
                                                        <button
                                                            type="button"
                                                            onClick={() => handleQuantityChange(product.id, -1)}
                                                            className="btn btn-blue text-sm">
                                                            -
                                                        </button>
                                                        <p key={"q" + product.id} className="text-sm font-medium text-gray-900">
                                                            x{product.quantity}
                                                        </p>
                                                        <button
                                                            type="button"
                                                            onClick={() => handleQuantityChange(product.id, 1)}
                                                            className="btn btn-blue text-sm">
                                                            +
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="mt-4 sm:mt-0 sm:pr-9">
                                                <div className="absolute top-0 right-0"></div>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </section>

                <section
                    aria-labelledby="summary-heading"
                    className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8">
                    <h2 id="summary-heading" className="text-lg font-medium text-gray-900">
                        Zusammenfassung
                    </h2>

                    <dl className="mt-6 space-y-4">
                        <div className="flex items-center justify-between">
                            <dt className="text-sm text-gray-600">Zwischensumme</dt>
                            <dd className="text-sm font-medium text-gray-900">
                                {isClient ? Utils.price.display(subtotal) : null}
                            </dd>
                        </div>
                        <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                            <dt className="flex items-center text-sm text-gray-600">
                                <span>Ungefähre Lieferkosten</span>
                            </dt>
                            <dd className="text-sm font-medium text-gray-900">
                                {Utils.price.display(shipping)}
                            </dd>
                        </div>
                        <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                            <dt className="flex text-sm text-gray-600">
                                <span>Ungefähre Steuern</span>
                            </dt>
                            <dd className="text-sm font-medium text-gray-900">
                                {isClient ? Utils.price.display(tax) : null}
                            </dd>
                        </div>
                        <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                            <dt className="text-base font-medium text-gray-900">Summe</dt>
                            <dd className="text-base font-medium text-gray-900">
                                {isClient ? Utils.price.display(orderTotal) : null}
                            </dd>
                        </div>
                    </dl>

                    <div className="mt-6">
                        {!showPayPal ? (
                            <button
                                type="button"
                                onClick={handleProceedToPayment}
                                disabled={items.length === 0}
                                className="w-full rounded-md border border-transparent bg-indigo-600 px-4 py-3 text-base font-medium text-white shadow-xs hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50 focus:outline-hidden disabled:bg-gray-400 disabled:cursor-not-allowed">
                                Zur Zahlung
                            </button>
                        ) : (
                            <div className="space-y-4">
                                <PayPalScriptProvider options={initialOptions}>
                                    <PayPalButtons
                                        createOrder={createOrder}
                                        onApprove={onApprove}
                                        style={{
                                            layout: 'vertical',
                                            color: 'blue',
                                            shape: 'rect',
                                            label: 'paypal'
                                        }}
                                    />
                                </PayPalScriptProvider>
                                <button
                                    type="button"
                                    onClick={() => setShowPayPal(false)}
                                    className="w-full rounded-md border border-gray-300 bg-white px-4 py-3 text-base font-medium text-gray-700 shadow-xs hover:bg-gray-50 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50 focus:outline-hidden">
                                    Zurück
                                </button>
                            </div>
                        )}
                    </div>
                </section>
            </div>
        </main>
    );
}