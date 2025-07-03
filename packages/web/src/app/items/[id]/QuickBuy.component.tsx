"use client";

import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import RubberDuck from "@/lib/model/rubberduck/Rubberduck.type";
import { captureOrder, placeOrder } from "@/app/demo/checkout/Checkout.actions";

interface QuickBuyProps {
    duck: RubberDuck;
}

/**
 * Renders a PayPal "Quick Buy" button for a single product.
 *
 * @param {QuickBuyProps} props - The props for the component.
 * @returns {JSX.Element} The rendered "Quick Buy" component.
 */
export default function QuickBuy({ duck }: QuickBuyProps) {
    // The shopping cart for the quick buy contains only this single item.
    const quickBuyCart = [{ id: duck.id, qty: 1 }];

    return (
        <div className="mt-4 px-4 sm:px-0">
            <PayPalScriptProvider
                options={{
                    clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID!,
                    currency: "EUR",
                    intent: "capture",
                }}>
                <PayPalButtons
                    style={{ layout: "horizontal", label: "buynow" }}
                    createOrder={async () => {
                        // The existing placeOrder action is reused here.
                        return await placeOrder(quickBuyCart);
                    }}
                    onApprove={async (data) => {
                        // The existing captureOrder action is also reused here.
                        await captureOrder(data.orderID);
                        // After successful payment, redirect to the homepage.
                        window.location.href = "/";
                    }}
                />
            </PayPalScriptProvider>
        </div>
    );
}
