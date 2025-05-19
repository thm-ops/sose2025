import React from "react";
import ShoppingCart from "@/app/cart/cart.component";
import Header from "@/app/Header.component";
import Footer from "@/app/Footer.component";
import RubberDuck from "@/lib/model/rubberduck/Rubberduck.type";

export type ShoppingCartItem = RubberDuck & {
    quantity: number;
    inStock: boolean;
};

// Example CartItems for demonstration purposes

const exampleCartItem: ShoppingCartItem = {
    id: 1,
    name: "Test Produkt",
    price: 29.99,
    color: "red",
    origin: "test",
    producer: "test",
    weight: 20,
    size: "m",
    description: "",
    material: "",
    quantity: 1,
    inStock: true,
};

const exampleCartItem2: ShoppingCartItem = {
    id: 2,
    name: "Test Produkt2",
    price: 9.99,
    color: "yellow",
    origin: "test",
    producer: "test",
    weight: 20,
    size: "m",
    description: "",
    material: "",
    quantity: 1,
    inStock: true,
};

const ShoppingCartPage: React.FC = () => {
    const cartItems: ShoppingCartItem[] = [exampleCartItem, exampleCartItem2];

    return (
        <div>
            <Header />
            <ShoppingCart products={cartItems} cartItems={cartItems} />
            <Footer />
        </div>
    );
};

export default ShoppingCartPage;
