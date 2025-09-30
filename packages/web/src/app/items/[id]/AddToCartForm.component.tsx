"use client";
import useCart from "@/lib/hooks/cart/useCart.hook";
import { useState } from "react";
import { Button } from "@headlessui/react";

/**
 * @component AddToCartForm
 * @description
 * A form component that allows users to select a product quantity and add the item to the shopping cart.
 *
 * Features:
 * - Increment and decrement quantity controls.
 * - Prevents quantity from going below 1.
 * - Updates the global cart state via useCart hook.
 * - Displays a toast notification when a product is added to the cart.
 *
 * @param {Object} props - Component props.
 * @param {number} props.id - The product ID to add to the cart.
 *
 * @returns {JSX.Element} The add-to-cart form with quantity selector.
 */
export default function AddToCartForm({ id }: { id: number }) {
    const [quantity, setQuantity] = useState(1);
    const [cart, setCart] = useCart();

    /** Controls popup toast visibility */
    const [showToast, setShowToast] = useState(false);

    /**
     * Decrements the quantity by 1 without going below 1.
     */

    const handleDecrement = () => {
        setQuantity((prev) => Math.max(1, prev - 1));
    };

    /**
     * Increments the quantity by 1.
     */

    const handleIncrement = () => {
        setQuantity((prev) => prev + 1);
    };

    /**
     * Prevents default form submission and calls addToCart.
     */
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        addToCart();
    };


    /**
     * Adds the product to the cart. If the product already exists, increments its quantity.
     * Also shows a toast notification for feedback.
     */
    function addToCart() {
        const existingEntry = cart.find((item) => item.id === id);

        if (existingEntry !== undefined) {
            setCart([...cart.filter((item) => item.id !== id), { id, qty: existingEntry.qty + quantity },
            ]);

        } else {
            setCart([...cart, { id, qty: quantity }]);
        }

        // Reset quantity after add
        setQuantity(1);
        // Show toast
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000); // Hide after 3s
    }

    return (
        <>
        <form className="mt-10 px-4 sm:px-0" onSubmit={handleSubmit}>
            {/* Quantity selector */}
            <div className="flex items-center gap-3">
                <button
                    type="button"
                    onClick={handleDecrement}
                    className="rounded-md bg-gray-200 px-3 py-1 text-gray-700 hover:bg-gray-300"
                    aria-label="Decrease quantity">
                    –
                </button>
                <span className="w-6 text-center" aria-live="polite">
                    {quantity}
                </span>
                <button
                    type="button"
                    onClick={handleIncrement}
                    className="rounded-md bg-gray-200 px-3 py-1 text-gray-700 hover:bg-gray-300"
                    aria-label="Increase quantity">
                    +
                </button>
            </div>

            {/* Submit button */}
            <div className="mt-6">
                <Button
                    onClick={addToCart}
                    type="submit"
                    className="flex items-center justify-center w-full rounded-md border border-transparent bg-indigo-600 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50">
                    Add to cart
                </Button>
            </div>
        </form>

            {/* Toast notification */}
            {showToast && (
                <div
                    className="fixed bottom-5 right-5 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg animate-fade-in-out"
                    role="alert"
                >
                   Product added to cart!
                </div>
            )}
        </>

    );
}
