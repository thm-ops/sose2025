"use client";

import useCart from "@/lib/hooks/cart/useCart.hook";
import Checkout from "./Checkout.component";

export default function DemoPage() {
    const [cart] = useCart();

    if (cart.length === 0) {
        return (
            <div>
                <h1>Your cart is empty.</h1>
            </div>
        );
    }

    return (
        <div>
            <h1>Checkout your Cart</h1>
            <Checkout />
        </div>
    );
}
