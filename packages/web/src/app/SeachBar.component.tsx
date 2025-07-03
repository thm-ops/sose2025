"use client";

import React from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/16/solid";

/**
 * @component SearchBar
 * @description A reusable SearchBar.
 * @param {string} searchTerm - The current value of the SearchBar.
 * @param {(value: string) => void} setSearchTerm - Function to update the search term.
 * @param {string} placeholder - The placeholder for the Input field.
 */
export default function SearchBar({
    searchTerm,
    setSearchTerm,
    placeholder,
}: {
    searchTerm: string;
    setSearchTerm: (value: string) => void;
    placeholder: string;
}) {
    return (
        <div className="relative w-full sm:w-auto">
            <input
                type="text"
                placeholder={placeholder}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full sm:w-64 lg:w-80 px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            />
            <MagnifyingGlassIcon className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 h-6" />
        </div>
    );
}
