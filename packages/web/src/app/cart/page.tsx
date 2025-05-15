import React from 'react';
import ShoppingCart from "@/app/cart/cart.component";

export type CartItem = {
    id: number;
    name: string;
    price: number;
    quantity: number;
    image: string;
};

type ShoppingCartPageProps = {
    cartItems?: CartItem[];
};

const ShoppingCartPage: React.FC<ShoppingCartPageProps> = ({ cartItems = [] }) => {
    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    // Convert CartItems to Products for the ShoppingCart component
    const products = cartItems.map(item => ({
        id: item.id.toString(),
        name: item.name,
        href: '#',
        color: '',
        price: `$${item.price.toFixed(2)}`,
        imageSrc: item.image,
        imageAlt: item.name,
        inStock: true
    }));

    return (
        <ShoppingCart products={products} cartItems={cartItems} total={total} relatedProducts={[]} />
    );
};

export default ShoppingCartPage;