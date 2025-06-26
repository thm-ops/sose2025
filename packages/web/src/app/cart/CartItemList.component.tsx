import { ShoppingCartItem } from "@/app/cart/page";
import React from "react";
import CartItem from "./CartItem.component";

type CartItemListProps = {
    items: ShoppingCartItem[];
    onQuantityChange: (id: number, delta: number) => void;
    onDeleteItem: (id: number) => void;
};

/**
 * Renders the list of items in the cart
 * @param {ShoppingCartItem[]} items - An array of cart items
 * @param {function} onQuantityChange - The function for quantity change
 * @param {function} onDeleteItem - The function to delete an item
 */
const CartItemList: React.FC<CartItemListProps> = ({ items, onQuantityChange, onDeleteItem }) => {
    return (
        <section aria-labelledby="cart-heading" className="lg:col-span-7">
            <h2 id="cart-heading" className="sr-only">
                Ware in deinem Warenkorb
            </h2>
            <ul role="list" className="divide-y divide-gray-200 border-t border-b border-gray-200">
                {items.map((item) => (
                    <CartItem key={item.id} item={item} onQuantityChange={onQuantityChange} onDeleteItem={onDeleteItem} />
                ))}
            </ul>
        </section>
    );
};

export default CartItemList;
