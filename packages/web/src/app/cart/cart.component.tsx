"use client";

import React, { useState, useEffect } from "react";
import { ShoppingCartItem } from "@/app/cart/page";
import { Utils } from "@/lib/utils/mod";
import CartItemList from "./CartItemList.component";
import OrderSummary from "./OrderSummary.component";

type ShoppingCartProps = {
    initialProducts?: ShoppingCartItem[];
};

/**
 * The main component
 * Manages the state of the items, calculates the totals, and renders the child components.
 * @param {ShoppingCartItem[]} initialProducts - The initial products to be displayed in the shopping cart.
 */
const ShoppingCart: React.FC<ShoppingCartProps> = ({ initialProducts = [] }) => {
    const [isClient, setIsClient] = useState(false);
    const [items, setItems] = useState<ShoppingCartItem[]>(initialProducts);

    useEffect(() => {
        setIsClient(true);
    }, []);

    const handleDeleteItem = (id: number) => {
        setItems((prevItems) => prevItems.filter((item) => item.id !== id));
    };

    const handleQuantityChange = (id: number, delta: number) => {
        setItems(
            (prevItems) =>
                prevItems
                    .map((item) =>
                        item.id === id
                            ? { ...item, quantity: Math.max(1, item.quantity + delta) } // amount cant be less than 1
                            : item,
                    )
                    .filter((item) => item.quantity > 0), // Optional: remove item if count is 0
        );
    };

    // Calculating the subtotal
    const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const shipping = 500; // 5,00 €
    const tax = subtotal * 0.19; // assuming: 19% tax.
    const orderTotal = subtotal + shipping + tax;

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // Logic for the ordering process
        console.log("Bestellung abgeschickt:", {
            items,
            subtotal: Utils.price.display(subtotal),
            orderTotal: Utils.price.display(orderTotal),
        });
        alert("Bestellung wurde abgeschickt!");
    };

    return (
        <main className="mx-auto max-w-2xl px-4 pt-16 pb-24 sm:px-6 lg:max-w-7xl lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Warenkorb</h1>

            <form onSubmit={handleSubmit} className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
                <CartItemList items={items} onQuantityChange={handleQuantityChange} onDeleteItem={handleDeleteItem} />
                <OrderSummary subtotal={subtotal} shipping={shipping} tax={tax} orderTotal={orderTotal} isClient={isClient} />
            </form>
        </main>
    );
};

export default ShoppingCart;
