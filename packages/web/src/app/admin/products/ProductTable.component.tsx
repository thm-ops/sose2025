"use client";

import Image from "next/image";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { PencilIcon, TrashIcon } from "@heroicons/react/16/solid";
import RubberDuck from "@/lib/model/rubberduck/Rubberduck.type";
import { Utils } from "@/lib/utils/mod";
import SortableHeader from "./SortableHeader.component";

// Define the types for sorting.
type SortKey = keyof RubberDuck;
type SortDirection = "asc" | "desc";

// Define the props for the ProductTable component.
interface ProductTableProps {
    products: RubberDuck[];
    sortKey: SortKey;
    sortDirection: SortDirection;
    onSort: (key: SortKey) => void;
    onEdit: (product: RubberDuck) => void;
    onDelete: (product: RubberDuck) => void;
}

/**
 * @component ProductTable
 * @description Renders a sortable table of products with a styled Headless UI dropdown menu.
 */
export default function ProductTable({ products, sortKey, sortDirection, onSort, onEdit, onDelete }: ProductTableProps) {
    return (
        // Main container with overflow handling for responsiveness on small screens.
        <div className="mt-8 flow-root">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                    <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                        {/* The main table structure. */}
                        <table className="min-w-full divide-y divide-gray-300">
                            {/* Table header with sortable columns. */}
                            <thead className="bg-gray-50">
                                <tr>
                                    {/* A sortable header for each column. */}
                                    <SortableHeader
                                        label="Name"
                                        sortKey="name"
                                        currentSortKey={sortKey}
                                        sortDirection={sortDirection}
                                        onSort={onSort}
                                    />
                                    <SortableHeader
                                        label="Preis"
                                        sortKey="price"
                                        currentSortKey={sortKey}
                                        sortDirection={sortDirection}
                                        onSort={onSort}
                                    />
                                    <SortableHeader
                                        label="Farbe"
                                        sortKey="color"
                                        currentSortKey={sortKey}
                                        sortDirection={sortDirection}
                                        onSort={onSort}
                                    />
                                    <SortableHeader
                                        label="Größe"
                                        sortKey="size"
                                        currentSortKey={sortKey}
                                        sortDirection={sortDirection}
                                        onSort={onSort}
                                    />
                                    <SortableHeader
                                        label="Material"
                                        sortKey="material"
                                        currentSortKey={sortKey}
                                        sortDirection={sortDirection}
                                        onSort={onSort}
                                    />
                                    <SortableHeader
                                        label="Hersteller"
                                        sortKey="producer"
                                        currentSortKey={sortKey}
                                        sortDirection={sortDirection}
                                        onSort={onSort}
                                    />
                                    {/* A visually hidden header for the actions column. */}
                                    <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                                        <span className="sr-only">Actions</span>
                                    </th>
                                </tr>
                            </thead>
                            {/* Table body where product rows are rendered. */}
                            <tbody className="divide-y divide-gray-200 bg-white">
                                {/* Map over the products array to create a row for each one. */}
                                {products.map((product) => (
                                    <tr key={product.id}>
                                        {/* Cell for the product's image, name, and brand. */}
                                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                                            <div className="flex items-center">
                                                <div className="h-10 w-10 flex-shrink-0">
                                                    <Image
                                                        className="h-10 w-10 rounded-full object-cover"
                                                        src={`https://picsum.photos/seed/${product.id}/40/40`}
                                                        alt={product.name}
                                                        width={40}
                                                        height={40}
                                                    />
                                                </div>
                                                <div className="ml-4">
                                                    <div className="font-medium text-gray-900">{product.name}</div>
                                                    <div className="text-gray-500">{product.brand}</div>
                                                </div>
                                            </div>
                                        </td>
                                        {/* Cells for other product details. */}
                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                            {Utils.price.display(product.price)}
                                        </td>
                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 capitalize">{product.color}</td>
                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 uppercase">{product.size}</td>
                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{product.material}</td>
                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{product.producer}</td>
                                        {/* Cell for the action menu (edit/delete). */}
                                        <td className="whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                            {/* Headless UI Menu component for the dropdown. */}
                                            <Menu>
                                                {/* The button that triggers the dropdown menu. */}
                                                <MenuButton className="flex items-center rounded-full bg-gray-100 p-1 text-gray-400 hover:text-gray-600 focus:outline-none data-[active]:bg-gray-200 data-[open]:bg-gray-200">
                                                    <span className="sr-only">Open options</span>
                                                    <EllipsisVerticalIcon className="h-5 w-5" aria-hidden="true" />
                                                </MenuButton>
                                                {/* The container for the menu items with transition effects. */}
                                                <MenuItems
                                                    transition
                                                    anchor="bottom end"
                                                    className="absolute z-10 w-40 origin-top-right rounded-xl bg-white p-1 text-sm shadow-lg ring-1 ring-black ring-opacity-5 transition duration-100 ease-out focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0">
                                                    {/* Menu item for the "Edit" action. */}
                                                    <MenuItem>
                                                        <button
                                                            onClick={() => onEdit(product)}
                                                            className="group flex w-full items-center gap-2 rounded-lg px-3 py-1.5 text-gray-700 data-[focus]:bg-gray-100">
                                                            <PencilIcon className="size-4 fill-gray-500" />
                                                            Bearbeiten
                                                        </button>
                                                    </MenuItem>
                                                    {/* Menu item for the "Delete" action. */}
                                                    <MenuItem>
                                                        <button
                                                            onClick={() => onDelete(product)}
                                                            className="group flex w-full items-center gap-2 rounded-lg px-3 py-1.5 text-red-600 data-[focus]:bg-red-50">
                                                            <TrashIcon className="size-4 fill-red-500" />
                                                            Löschen
                                                        </button>
                                                    </MenuItem>
                                                </MenuItems>
                                            </Menu>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
