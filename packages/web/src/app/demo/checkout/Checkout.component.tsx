"use client";

import useCart from "@/lib/hooks/cart/useCart.hook";
import { captureOrder, placeOrder } from "./Checkout.actions";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";

/**
 * Renders the checkout page with PayPal integration.
 *
 * This component uses the PayPalScriptProvider and PayPalButtons to get the necessary
 * PayPal scripts and buttons for handling the checkout process. 
 *
 * @returns {JSX.Element} The rendered checkout component.
 */
export default function Checkout() {
    const [cart, setCart] = useCart();

    return (
        <PayPalScriptProvider
            options={{
                clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID!,
                currency: "EUR",
                intent: "capture",
            }}>
            <PayPalButtons
                createOrder={async () => {
                    return await placeOrder(cart);
                }}
                onApprove={async (data) => {
                    await captureOrder(data.orderID);
                    setCart([]);
                    window.location.href = "/demo";
                }}
            />
        </PayPalScriptProvider>
    );
}
