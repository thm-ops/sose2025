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
 * @component SortIndicatorIcon
 * @description Displays an SVG icon indicating the sort status (unsorted, ascending, or descending).
 */
function SortIndicatorIcon({ isSorted, direction }: { isSorted: boolean; direction: "ascending" | "descending" }) {
    if (!isSorted) {
        return (
            <span className="ml-1.5 opacity-20 group-hover:opacity-50">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                    data-slot="icon"
                    className="h-5 w-5">
                    <path
                        fillRule="evenodd"
                        d="M11.47 4.72a.75.75 0 0 1 1.06 0l3.75 3.75a.75.75 0 0 1-1.06 1.06L12 6.31 8.78 9.53a.75.75 0 0 1-1.06-1.06l3.75-3.75Zm-3.75 9.75a.75.75 0 0 1 1.06 0L12 17.69l3.22-3.22a.75.75 0 1 1 1.06 1.06l-3.75 3.75a.75.75 0 0 1-1.06 0l-3.75-3.75a.75.75 0 0 1 0-1.06Z"
                        clipRule="evenodd"></path>
                </svg>
            </span>
        );
    }
    return (
        <span className="ml-1.5 opacity-80">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
                data-slot="icon"
                className="h-5 w-5">
                {direction === "ascending" ? (
                    <path
                        fillRule="evenodd"
                        d="M11.47 4.72a.75.75 0 0 1 1.06 0l3.75 3.75a.75.75 0 0 1-1.06 1.06L12 6.31 8.78 9.53a.75.75 0 0 1-1.06-1.06l3.75-3.75Z"
                        clipRule="evenodd"
                    />
                ) : (
                    <path
                        fillRule="evenodd"
                        d="M12.53 19.78a.75.75 0 0 1-1.06 0l-3.75-3.75a.75.75 0 1 1 1.06-1.06L12 17.69l3.22-3.22a.75.75 0 1 1 1.06 1.06l-3.75 3.75Z"
                        clipRule="evenodd"
                    />
                )}
            </svg>
        </span>
    );
}

/**
 * @component ProductTable
 * @description Renders a sortable table of products with a styled Headless UI dropdown menu.
 */
export default function ProductTable({ products, sortKey, sortDirection, onSort, onEdit, onDelete }: ProductTableProps) {
    return (
        <div className="mt-8 flow-root">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                    <div className="bg-white shadow-md rounded-lg overflow-hidden">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <SortableHeader
                                        label="Name"
                                        sortKey="name"
                                        currentSortKey={sortKey}
                                        sortDirection={sortDirection}
                                        onSort={onSort}
                                        Icon={SortIndicatorIcon}
                                    />
                                    <SortableHeader
                                        label="Preis"
                                        sortKey="price"
                                        currentSortKey={sortKey}
                                        sortDirection={sortDirection}
                                        onSort={onSort}
                                        Icon={SortIndicatorIcon}
                                    />
                                    <SortableHeader
                                        label="Farbe"
                                        sortKey="color"
                                        currentSortKey={sortKey}
                                        sortDirection={sortDirection}
                                        onSort={onSort}
                                        Icon={SortIndicatorIcon}
                                    />
                                    <SortableHeader
                                        label="Größe"
                                        sortKey="size"
                                        currentSortKey={sortKey}
                                        sortDirection={sortDirection}
                                        onSort={onSort}
                                        Icon={SortIndicatorIcon}
                                    />
                                    <SortableHeader
                                        label="Material"
                                        sortKey="material"
                                        currentSortKey={sortKey}
                                        sortDirection={sortDirection}
                                        onSort={onSort}
                                        Icon={SortIndicatorIcon}
                                    />
                                    <SortableHeader
                                        label="Hersteller"
                                        sortKey="producer"
                                        currentSortKey={sortKey}
                                        sortDirection={sortDirection}
                                        onSort={onSort}
                                        Icon={SortIndicatorIcon}
                                    />
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Aktionen
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 bg-white">
                                {products.map((product) => (
                                    <tr key={product.id} className="hover:bg-gray-50 transition-colors duration-200">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm">
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
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {Utils.price.display(product.price)}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">{product.color}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 uppercase">{product.size}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.material}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.producer}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-right">
                                            <Menu as="div" className="relative inline-block text-left">
                                                <MenuButton className="flex items-center rounded-full bg-gray-100 p-1 text-gray-400 hover:text-gray-600 focus:outline-none data-[active]:bg-gray-200 data-[open]:bg-gray-200">
                                                    <span className="sr-only">Open options</span>
                                                    <EllipsisVerticalIcon className="h-5 w-5" aria-hidden="true" />
                                                </MenuButton>
                                                <MenuItems
                                                    transition
                                                    anchor="bottom end"
                                                    className="absolute z-10 mt-2 w-40 origin-top-right rounded-xl bg-white p-1 text-sm shadow-lg ring-1 ring-black ring-opacity-5 transition duration-100 ease-out focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0">
                                                    <MenuItem>
                                                        <button
                                                            onClick={() => onEdit(product)}
                                                            className="group flex w-full items-center gap-2 rounded-lg px-3 py-1.5 text-gray-700 data-[focus]:bg-gray-100">
                                                            <PencilIcon className="size-4 fill-gray-500" />
                                                            Bearbeiten
                                                        </button>
                                                    </MenuItem>
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
