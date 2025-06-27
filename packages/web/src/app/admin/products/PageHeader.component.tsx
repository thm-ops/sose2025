"use client";

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import Button from "./Button.component";

// Define the props for the PageHeader component.
interface PageHeaderProps {
    searchTerm: string; // The current search term value.
    setSearchTerm: (value: string) => void; // Function to update the search term.
    onAddProduct: () => void; // Function to trigger opening the add product modal.
}

/**
 * @component PageHeader
 * @description Header for the product management page, including title, search bar, and an "Add Product" button.
 */
export default function PageHeader({ searchTerm, setSearchTerm, onAddProduct }: PageHeaderProps) {
    return (
        <div>
            {/* Main header container with title and add button. */}
            <div className="sm:flex sm:items-center sm:justify-between">
                {/* Page title. */}
                <h1 className="text-2xl font-bold leading-6 text-gray-900">Produkte</h1>
                {/* "Add Product" button. */}
                <div className="mt-3 sm:mt-0 sm:ml-4">
                    <Button onClick={onAddProduct}>Produkt hinzufügen</Button>
                </div>
            </div>
            {/* Container for the search bar. */}
            <div className="mt-4">
                <div className="relative">
                    {/* Search icon positioned inside the input field. */}
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    </div>
                    {/* The search input field. */}
                    <input
                        type="text"
                        name="search"
                        id="search"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        placeholder="Produkt suchen..."
                    />
                </div>
            </div>
        </div>
    );
}
