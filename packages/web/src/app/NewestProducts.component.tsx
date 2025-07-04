"use client";

import Image from "next/image";
import Link from "next/link";
import { RubberDuck } from "@/lib/model/rubberduck/prisma/Rubberduck.type";
import getDucks from "../lib/actions/rubberduck/getDucks";
import React, { useState, useEffect } from "react";
import { Utils } from "@/lib/utils/mod";
import SearchBar from "@/app/SeachBar.component";
import { notFound } from "next/navigation";

/**
 * @component ProductCard
 * @description Shows a single ProductCard.
 * @param {RubberDuck} product - The product object.
 */
const ProductCard = ({ product }: { product: RubberDuck }) => (
    <li key={product.id} className="group transition-transform duration-200 hover:scale-105">
        <Link
            href={`/items/${product.id}`}
            className="rounded-lg overflow-hidden bg-white transition-colors duration-200 group-hover:bg-gray-100 shadow-sm hover:shadow-lg border border-gray-200 h-full flex flex-col">
            <div className="aspect-square w-full">
                <Image
                    src={`/media/products/${product.id}`}
                    alt={product.name}
                    width={800}
                    height={800}
                    className="object-cover w-full h-full"
                />
            </div>
            <div className="p-4 flex flex-col flex-grow">
                <div className="flex items-start justify-between text-base font-medium text-gray-900">
                    <h3 className="pr-2">{product.name.length > 30 ? product.name.slice(0, 30) + "…" : product.name}</h3>
                    <p className="flex-shrink-0">{Utils.price.display(product.price)}</p>
                </div>
                <p className="mt-1 text-sm text-gray-500">{product.producer.name}</p>
            </div>
        </Link>
    </li>
);

/**
 * @component ProductGrid
 * @description Shows a grid of product cards.
 * @param {RubberDuck[]} products - An array of products.
 */
const ProductGrid = ({ products }: { products: RubberDuck[] }) => (
    <ul className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
        {products.map((product) => (
            <ProductCard key={product.id} product={product} />
        ))}
    </ul>
);

/**
 * @component NoResults
 * @description Shows a massage if no search result was found.
 */
const NoResults = () => (
    <div className="text-center py-10 col-span-full">
        <p className="text-gray-500">Keine Produkte gefunden, die zu deiner Suche passen.</p>
    </div>
);

/**
 * @component NewestProducts
 * @description Displays the newest products.
 * This component combines the smaller components.
 */
export default function NewestProducts() {
    const [searchTerm, setSearchTerm] = useState("");
    const [products, setProducts] = useState<RubberDuck[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<RubberDuck[]>([]);

    // Fetch products on mount
    useEffect(() => {
        getDucks()
            .then((ducks) => setProducts(ducks))
            .catch(notFound);
    }, []);

    // Effekt for filtering the products when the search term or products change
    useEffect(() => {
        const lowercasedFilter = searchTerm.toLowerCase();
        const filtered = products.filter(
            (product) =>
                product.name.toLowerCase().includes(lowercasedFilter) ||
                product.producer.name.toLowerCase().includes(lowercasedFilter) ||
                product.color.toLowerCase().includes(lowercasedFilter) ||
                product.size.toLowerCase().includes(lowercasedFilter),
        );
        setFilteredProducts(filtered);
    }, [searchTerm, products]);

    return (
        <div className="bg-white">
            <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8" id="productsList">
                <div className="flex flex-col gap-8">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <h2 className="text-2xl font-bold tracking-tight text-gray-900">Produkte</h2>
                        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} placeholder="Suche nach Enten..." />
                    </div>

                    <div className="mt-2">{filteredProducts.length > 0 ? <ProductGrid products={filteredProducts} /> : <NoResults />}</div>
                </div>
            </div>
        </div>
    );
}
