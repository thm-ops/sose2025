"use client";
import { useState } from "react";
import { Button } from "@headlessui/react";

export default function AddToCartForm() {
    const [quantity, setQuantity] = useState(1);

    const handleDecrement = () => {
        setQuantity((prev) => Math.max(1, prev - 1));
    };

    const handleIncrement = () => {
        setQuantity((prev) => prev + 1);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // Implement logic for adding to cart here
        console.log(`Product added to cart: Quantity ${quantity}`);
    };

    return (
        <form className="mt-10 px-4 sm:px-0" onSubmit={handleSubmit}>
            {" "}
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
            <div className="mt-6">
                <Button
                    type="submit"
                    className="flex items-center justify-center w-full rounded-md border border-transparent bg-indigo-600 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50">
                    Add to cart
                </Button>
            </div>
        </form>
    );
}
