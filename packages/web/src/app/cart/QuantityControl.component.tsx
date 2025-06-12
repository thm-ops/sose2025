import React from "react";

type QuantityControlProps = {
    productId: number;
    quantity: number;
    onQuantityChange: (id: number, delta: number) => void;
};

/**
 * Displays the control elements (+/-) to change the quantity
 * @param {number} productId - ID of the product
 * @param {number} quantity - the current quantity
 * @param {function} onQuantityChange - Callback-Function to be called when the quantity changes
 */
const QuantityControl: React.FC<QuantityControlProps> = ({ productId, quantity, onQuantityChange }) => {
    return (
        <div className="flex items-center gap-2 mb-4">
            <button
                type="button"
                onClick={() => onQuantityChange(productId, -1)}
                className="rounded-md px-2 py-1 text-gray-600 border hover:bg-gray-100 transition-colors"
                aria-label="Menge verringern">
                -
            </button>
            <p className="text-sm font-medium text-gray-900 w-4 text-center">{quantity}</p>
            <button
                type="button"
                onClick={() => onQuantityChange(productId, 1)}
                className="rounded-md px-2 py-1 text-gray-600 border hover:bg-gray-100 transition-colors"
                aria-label="Menge erhöhen">
                +
            </button>
        </div>
    );
};

export default QuantityControl;
