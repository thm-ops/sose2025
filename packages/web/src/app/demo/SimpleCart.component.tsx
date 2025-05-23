"use client";

import useCart from "@/lib/hooks/cart/useCart.hook";
import CartItem from "@/lib/model/cart/CartItem.model";
import { useState } from "react";

export default function SimpleCart() {
    const [cart, setCart] = useCart();

    const [formId, setFormId] = useState(0);
    const [formQty, setFormQty] = useState(0);

    return (
        <div>
            <h1>Simple Cart Demo</h1>
            <div>
                {cart.map((item: CartItem, i: number) => (
                    <div key={i}>
                        <div>{item.id}</div>
                        <div>{item.qty}</div>
                    </div>
                ))}
            </div>
            <hr />
            <div>
                <input type="number" value={formId} onChange={(event) => setFormId(parseInt(event.target.value) || 0)} />
                <input type="number" value={formQty} onChange={(event) => setFormQty(parseInt(event.target.value) || 0)} />
                <button
                    onClick={() => {
                        setCart([...cart, { id: formId, qty: formQty }]);
                        setFormId(0);
                        setFormQty(0);
                    }}>
                    Add
                </button>
            </div>
        </div>
    );
}
