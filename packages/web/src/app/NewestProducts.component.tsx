"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useMemo } from "react";
import { rubberDuckData } from "@/data/data";
import RubberDuck from "@/lib/model/rubberduck/Rubberduck.type";
import { Utils } from "@/lib/utils/mod";

const products: RubberDuck[] = rubberDuckData;

/**
 * @component NewestProducts
 * @description Displays a list of the newest products in a grid layout with search and filter functionality.
 */
export default function NewestProducts() {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedProducer, setSelectedProducer] = useState("all");
    const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);

    // Obtenir la liste unique des producteurs
    const producers = useMemo(() => {
        const uniqueProducers = [...new Set(products.map(p => p.producer))];
        return uniqueProducers.sort();
    }, []);

    // Filtrer les produits
    const filteredProducts = useMemo(() => {
        return products.filter(product => {
            // Filtre par recherche
            const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                product.producer.toLowerCase().includes(searchTerm.toLowerCase());

            // Filtre par producteur
            const matchesProducer = selectedProducer === "all" || product.producer === selectedProducer;

            // Filtre par prix
            const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];

            return matchesSearch && matchesProducer && matchesPrice;
        });
    }, [searchTerm, selectedProducer, priceRange]);

    return (
        <div className="bg-white">
            <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8" id="productsList">
                {/* Titre et barre de recherche */}
                <div className="space-y-4">
                    <h2 className="text-2xl font-bold tracking-tight text-gray-900">Neueste Produkte</h2>

                    {/* Barre de recherche */}
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Produkt suchen..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full px-4 py-2 pl-10 pr-4 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                        />
                        <svg
                            className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            />
                        </svg>
                    </div>

                    {/* Filtres */}
                    <div className="flex flex-wrap gap-4">
                        {/* Filtre par producteur */}
                        <div className="flex-1 min-w-[200px]">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Hersteller
                            </label>
                            <select
                                value={selectedProducer}
                                onChange={(e) => setSelectedProducer(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                            >
                                <option value="all">Alle Hersteller</option>
                                {producers.map((producer) => (
                                    <option key={producer} value={producer}>
                                        {producer}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Filtre par prix */}
                        <div className="flex-1 min-w-[200px]">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Maximaler Preis: {Utils.price.display(priceRange[1])}
                            </label>
                            <input
                                type="range"
                                min="0"
                                max="1000"
                                value={priceRange[1]}
                                onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                                className="w-full"
                            />
                        </div>
                    </div>

                    {/* Nombre de résultats */}
                    <p className="text-sm text-gray-500">
                        {filteredProducts.length} {filteredProducts.length === 1 ? 'Produkt' : 'Produkte'} gefunden
                    </p>
                </div>

                <div className="mt-10">
                    {filteredProducts.length > 0 ? (
                        <ul role="list" className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
                            {filteredProducts.map((product) => (
                                <li key={product.id} className="group transition-transform duration-200 hover:scale-105">
                                    <Link
                                        href={`/items/${product.id}`}
                                        className="block rounded-lg overflow-hidden bg-white transition-colors duration-200 group-hover:bg-gray-100">
                                        {/* Image */}
                                        <div className="aspect-square w-full">
                                            <Image
                                                src={`https://picsum.photos/seed/${product.id}/800/800`}
                                                alt={product.name}
                                                width={800}
                                                height={800}
                                                className="object-cover"
                                            />
                                        </div>

                                        {/* Texte */}
                                        <div className="p-4">
                                            <div className="flex items-center justify-between text-base font-medium text-gray-900">
                                                <h3>{product.name.length > 30 ? product.name.slice(0, 30) + "…" : product.name}</h3>
                                                <p>{Utils.price.display(product.price)}</p>
                                            </div>
                                            <p className="mt-1 text-sm text-gray-500">{product.producer}</p>
                                        </div>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <div className="text-center py-12">
                            <p className="text-gray-500">Keine Produkte entsprechen Ihrer Suche.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}