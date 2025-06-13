import React from "react";
import ShoppingCart from "@/app/cart/cart.component";
import Header from "@/app/Header.component";
import Footer from "@/app/Footer.component";

const ShoppingCartPage: React.FC = () => {
    return (
        <div>
            <Header />
            <ShoppingCart />
            <Footer />
        </div>
    );
};

export default ShoppingCartPage;
