"use client";
import Image from "next/image";
import Link from "next/link";
import { Utils } from "@/lib/utils/mod";
import { useEffect, useState } from "react";
import { RubberDuck } from "@/lib/model/rubberduck/prisma/Rubberduck.type";

/**
 * @component NewestProducts
 * @description Displays a list of the newest products in a grid layout.
 */
export default function NewestProducts() {
    const [products, setProducts] = useState<RubberDuck[]>([]);

    useEffect(() => {
        fetch("api/ducks")
            .then((res) => res.json())
            .then((ducks: RubberDuck[]) => setProducts(ducks))
            .catch((reason) => console.log("Fetching ducks error: " + reason));
    }, []);

    return (
        <div className="bg-white">
            <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8" id="productsList">
                {/* Sichtbarer Titel */}
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold tracking-tight text-gray-900">Neueste Produkte</h2>
                </div>

                <div className="mt-10">
                    <ul className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
                        {products.map((product) => (
                            <li key={product.id} className="group transition-transform duration-200 hover:scale-105">
                                <Link
                                    href={`/items/${product.id}`}
                                    className="block rounded-lg overflow-hidden bg-white transition-colors duration-200 group-hover:bg-gray-100">
                                    {/* Bild ohne Padding */}
                                    <div className="aspect-square w-full">
                                        <Image
                                            src={`/media/products/${product.id}`}
                                            alt={product.name}
                                            width={800}
                                            height={800}
                                            className="object-cover"
                                        />
                                    </div>

                                    {/* Text mit Padding */}
                                    <div className="p-4">
                                        <div className="flex items-center justify-between text-base font-medium text-gray-900">
                                            <h3>{product.name.length > 30 ? product.name.slice(0, 30) + "…" : product.name}</h3>
                                            <p>{Utils.price.display(product.price)}</p>
                                        </div>
                                        <p className="mt-1 text-sm text-gray-500">{product.brand?.name}</p>
                                    </div>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}
