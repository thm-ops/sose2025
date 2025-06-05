"use client";

import useCart from "@/lib/hooks/cart/useCart.hook";
import { captureOrder, placeOrder } from "./Checkout.actions";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";

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
