import React from "react";
import { Utils } from "@/lib/utils/mod";
import { Button } from "@headlessui/react";

type OrderSummaryProps = {
    subtotal: number;
    shipping: number;
    tax: number;
    orderTotal: number;
    isClient: boolean;
};

/**
 * Show the summary of the order, including subtotal, shipping, tax and total.
 * @param {number} subtotal - The subtotal of the order
 * @param {number} shipping - The shipping cost
 * @param {number} tax - The calculated tax
 * @param {number} orderTotal - The total of the order
 * @param {boolean} isClient - Flag to mitigate hydration-errors
 */
const OrderSummary: React.FC<OrderSummaryProps> = ({ subtotal, shipping, tax, orderTotal, isClient }) => {
    const renderPrice = (value: number) => {
        return isClient ? Utils.price.display(value) : null;
    };

    return (
        <section aria-labelledby="summary-heading" className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8">
            <h2 id="summary-heading" className="text-lg font-medium text-gray-900">
                Zusammenfassung
            </h2>

            <dl className="mt-6 space-y-4">
                <div className="flex items-center justify-between">
                    <dt className="text-sm text-gray-600">Zwischensumme</dt>
                    <dd className="text-sm font-medium text-gray-900">{renderPrice(subtotal)}</dd>
                </div>
                <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                    <dt className="text-sm text-gray-600">Ungefähre Lieferkosten</dt>
                    <dd className="text-sm font-medium text-gray-900">{Utils.price.display(shipping)}</dd>
                </div>
                <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                    <dt className="text-sm text-gray-600">Ungefähre Steuern</dt>
                    <dd className="text-sm font-medium text-gray-900">{renderPrice(tax)}</dd>
                </div>
                <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                    <dt className="text-base font-medium text-gray-900">Summe</dt>
                    <dd className="text-base font-medium text-gray-900">{renderPrice(orderTotal)}</dd>
                </div>
            </dl>

            <div className="mt-6">
                <Button
                    type="submit"
                    className="w-full rounded-md border border-transparent bg-indigo-600 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50">
                    Bestellen
                </Button>
            </div>
        </section>
    );
};

export default OrderSummary;
