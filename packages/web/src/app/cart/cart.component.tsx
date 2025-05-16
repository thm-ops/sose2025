"use client";

import React, { useState, useEffect } from "react";
import { CartItem } from "@/app/cart/page";
import Image from "next/image";

type Product = {
    id: string;
    name: string;
    href: string;
    color: string;
    size: string;
    price: string;
    imageSrc: string;
    imageAlt: string;
    inStock: boolean;
    leadTime?: string;
};

type ShoppingCartProps = {
    products?: Product[];
    relatedProducts?: Product[];
    cartItems: CartItem[];
    total: number;
};

const ShoppingCart: React.FC<ShoppingCartProps> = ({ products = [], relatedProducts = [], total }) => {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    // Calculate subtotal, tax and shipping for display
    const subtotal = total;
    const shipping = 5.0;
    const tax = total * 0.08; // Assuming 8% tax
    const orderTotal = subtotal + shipping + tax;

    return (
        <main className="mx-auto max-w-2xl px-4 pt-16 pb-24 sm:px-6 lg:max-w-7xl lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Shopping Cart</h1>

            <form className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
                <section aria-labelledby="cart-heading" className="lg:col-span-7">
                    <h2 id="cart-heading" className="sr-only">
                        Items in your shopping cart
                    </h2>

                    <ul role="list" className="divide-y divide-gray-200 border-t border-b border-gray-200">
                        {products.map((product) => (
                            <li key={product.id} className="flex py-6 sm:py-10">
                                <div className="shrink-0">
                                    <Image
                                        alt={product.imageAlt}
                                        src={product.imageSrc}
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
                                                    <a href={product.href} className="font-medium text-gray-700 hover:text-gray-800">
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
                                            <p className="mt-1 text-sm font-medium text-gray-900">{product.price}</p>
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
                        Order summary
                    </h2>

                    <dl className="mt-6 space-y-4">
                        <div className="flex items-center justify-between">
                            <dt className="text-sm text-gray-600">Subtotal</dt>
                            {/* Render null on server, formatted value on client */}
                            <dd className="text-sm font-medium text-gray-900">{isClient ? `$${subtotal.toFixed(2)}` : null}</dd>
                        </div>
                        <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                            <dt className="flex items-center text-sm text-gray-600">
                                <span>Shipping estimate</span>
                                <a href="#" className="ml-2 shrink-0 text-gray-400 hover:text-gray-500">
                                    <span className="sr-only">Learn more about how shipping is calculated</span>
                                </a>
                            </dt>
                            {/* Shipping is fixed, can render consistently */}
                            <dd className="text-sm font-medium text-gray-900">${shipping.toFixed(2)}</dd>
                        </div>
                        <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                            <dt className="flex text-sm text-gray-600">
                                <span>Tax estimate</span>
                                <a href="#" className="ml-2 shrink-0 text-gray-400 hover:text-gray-500">
                                    <span className="sr-only">Learn more about how tax is calculated</span>
                                </a>
                            </dt>
                            {/* Render null on server, formatted value on client */}
                            <dd className="text-sm font-medium text-gray-900">{isClient ? `$${tax.toFixed(2)}` : null}</dd>
                        </div>
                        <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                            <dt className="text-base font-medium text-gray-900">Order total</dt>
                            {/* Render null on server, formatted value on client */}
                            <dd className="text-base font-medium text-gray-900">{isClient ? `$${orderTotal.toFixed(2)}` : null}</dd>
                        </div>
                    </dl>

                    <div className="mt-6">
                        <button
                            type="submit"
                            className="w-full rounded-md border border-transparent bg-indigo-600 px-4 py-3 text-base font-medium text-white shadow-xs hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50 focus:outline-hidden">
                            Checkout
                        </button>
                    </div>
                </section>
            </form>

            {relatedProducts.length > 0 && (
                <section aria-labelledby="related-heading" className="mt-24">
                    <h2 id="related-heading" className="text-lg font-medium text-gray-900">
                        You may also like&hellip;
                    </h2>

                    <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                        {relatedProducts.map((product) => (
                            <div key={product.id} className="group relative">
                                <Image
                                    alt={product.imageAlt}
                                    src={product.imageSrc}
                                    height={100}
                                    width={100}
                                    className="aspect-square w-full rounded-md object-cover group-hover:opacity-75 lg:aspect-auto lg:h-80"
                                />
                                <div className="mt-4 flex justify-between">
                                    <div>
                                        <h3 className="text-sm text-gray-700">
                                            <a href={product.href}>
                                                <span aria-hidden="true" className="absolute inset-0" />
                                                {product.name}
                                            </a>
                                        </h3>
                                        <p className="mt-1 text-sm text-gray-500">{product.color}</p>
                                    </div>
                                    <p className="text-sm font-medium text-gray-900">{product.price}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            )}
        </main>
    );
};

export default ShoppingCart;
