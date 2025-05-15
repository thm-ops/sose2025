import React from 'react';
import ShoppingCart from "@/app/cart/cart.component";

export type CartItem = {
    id: number;
    name: string;
    price: number;
    size: string;
    quantity: number;
    image: string;
};

// Example CartItem for demonstration purposes
const exampleCartItem: CartItem = {
    id: 1,
    name: "Test Produkt",
    price: 29.99,
    size: "M",
    quantity: 2,
    image: "https://picsum.photos/800/450", // Dummy-Bild
};


const ShoppingCartPage: React.FC = () => {
    const cartItems: CartItem[] = [exampleCartItem];

    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const products = cartItems.map(item => ({
        id: item.id.toString(),
        name: item.name,
        href: '#',
        color: 'Grau',
        size: item.size,
        price: `$${item.price.toFixed(2)}`,
        imageSrc: item.image,
        imageAlt: item.name,
        inStock: true,
        leadTime: 'Ships in 3-5 days',
    }));

    return (
        <ShoppingCart
            products={products}
            cartItems={cartItems}
            total={total}
            relatedProducts={[]}
        />
    );
};

export default ShoppingCartPage;