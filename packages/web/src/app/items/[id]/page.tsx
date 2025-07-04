"use client";
import Header from "@/app/Header.component"; // Assumption: Header.component.tsx exists in src/app/
import ProductImage from "./ProductImage.component";
import ProductInfo from "./ProductInfo.component";
import ProductDetails from "./ProductDetails.component";
import AddToCartForm from "./AddToCartForm.component";
import { notFound, useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { RubberDuck } from "@/lib/model/rubberduck/prisma/Rubberduck.type";

export default function ItemsPage() {
    const params = useParams();
    const id = Number(params?.id);
    const [duck, setDuck] = useState<RubberDuck | null>(null);

    useEffect(() => {
        fetch(`/api/ducks/${id}`)
            .then((res) => res.json())
            .then((duck: RubberDuck) => setDuck(duck))
            .catch((reason) => console.log("Fetching duck error: " + reason));
    }, [id]);

    if (duck) {

    return (
        <div className="min-h-screen bg-white">
            <Header />
            <main className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                <div className="lg:grid lg:grid-cols-2 lg:items-center lg:gap-x-8">
                    <ProductImage duck={duck} />
                    <div>
                        {/* Retaining the layout container for product info and form */}
                        <ProductInfo duck={duck} />
                        <ProductDetails duck={duck} />
                        <AddToCartForm /> {/* May need duckId or other info as props */}
                    </div>
                </div>
            </main>
        </div>
    );
    }
}
