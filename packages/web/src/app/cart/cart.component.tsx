"use client";

import React, { useState, useEffect } from "react";
import { ShoppingCartItem } from "@/app/cart/page";
import Image from "next/image";
import { Utils } from "@/lib/utils/mod";

type ShoppingCartProps = {
    products?: ShoppingCartItem[];
    cartItems: ShoppingCartItem[];
};

const ShoppingCart: React.FC<ShoppingCartProps> = ({ products = [] }) => {
    const [isClient, setIsClient] = useState(false);
    const [items, setItems] = useState<ShoppingCartItem[]>(products);

    const handleQuantityChange = (id: number, delta: number) => {
        setItems((prevItems) =>
            prevItems.map((item) =>
                item.id === id
                    ? { ...item, quantity: Math.max(1, item.quantity + delta) } // mind. 1
                    : item,
            ),
        );
    };

    useEffect(() => {
        setIsClient(true);
    }, []);

    // Calculate subtotal, tax and shipping for display
    const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const shipping = 500;
    const tax = subtotal * 0.14; // Assuming 14% tax
    const orderTotal = subtotal + shipping + tax;

    return (
        <main className="mx-auto max-w-2xl px-4 pt-16 pb-24 sm:px-6 lg:max-w-7xl lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Warenkorb</h1>

            <form className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
                <section aria-labelledby="cart-heading" className="lg:col-span-7">
                    <h2 id="cart-heading" className="sr-only">
                        Ware in deinem Warenkorb
                    </h2>

                    <ul role="list" className="divide-y divide-gray-200 border-t border-b border-gray-200">
                        {items.map((product) => (
                            <li key={product.id} className="flex py-6 sm:py-10">
                                <div className="shrink-0">
                                    <Image
                                        alt={product.name}
                                        src={`/media/products/${product.id}`}
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
                            {/* Render null on server, formatted value on client */}
                            <dd className="text-sm font-medium text-gray-900">{isClient ? Utils.price.display(subtotal) : null}</dd>
                        </div>
                        <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                            <dt className="flex items-center text-sm text-gray-600">
                                <span>Ungefähre Lieferkosten</span>
                                <a href="#" className="ml-2 shrink-0 text-gray-400 hover:text-gray-500">
                                    <span className="sr-only">Lerne mehr über die Berechnung der Summe</span>
                                </a>
                            </dt>
                            {/* Shipping is fixed, can render consistently */}
                            <dd className="text-sm font-medium text-gray-900">{Utils.price.display(shipping)}</dd>
                        </div>
                        <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                            <dt className="flex text-sm text-gray-600">
                                <span>Ungefähre Steuern</span>
                                <a href="#" className="ml-2 shrink-0 text-gray-400 hover:text-gray-500">
                                    <span className="sr-only">Lerne mehr darüber, wie die Steuer berechnet wird</span>
                                </a>
                            </dt>
                            {/* Render null on server, formatted value on client */}
                            <dd className="text-sm font-medium text-gray-900">{isClient ? Utils.price.display(tax) : null}</dd>
                        </div>
                        <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                            <dt className="text-base font-medium text-gray-900">Summe</dt>
                            {/* Render null on server, formatted value on client */}
                            <dd className="text-base font-medium text-gray-900">{isClient ? Utils.price.display(orderTotal) : null}</dd>
                        </div>
                    </dl>

                    <div className="mt-6">
                        <button
                            type="submit"
                            className="w-full rounded-md border border-transparent bg-indigo-600 px-4 py-3 text-base font-medium text-white shadow-xs hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50 focus:outline-hidden">
                            Bestellen
                        </button>
                    </div>
                </section>
            </form>
        </main>
    );
};

export default ShoppingCart;
