"use client";

import { ChevronUpIcon, ChevronDownIcon, ChevronUpDownIcon } from "@heroicons/react/24/solid";

// Define the type for sort direction.
type SortDirection = "asc" | "desc";

// Define the generic props interface for the component.
// <T> allows this component to be used with any data type.
interface SortableHeaderProps<T> {
    label: string; // The text label for the header.
    sortKey: keyof T; // The key of the data model this header corresponds to.
    currentSortKey: keyof T; // The key the table is currently sorted by.
    sortDirection: SortDirection; // The current sort direction ('asc' or 'desc').
    onSort: (key: keyof T) => void; // Callback function to trigger sorting.
}

/**
 * @component SortableHeader
 * @description A reusable, generic table header component that allows for sorting.
 */
export default function SortableHeader<T>({ label, sortKey, currentSortKey, sortDirection, onSort }: SortableHeaderProps<T>) {
    // Check if this header is the currently active sorting column.
    const isSorting = currentSortKey === sortKey;
    // Select the appropriate icon based on the current sorting state.
    const Icon = isSorting ? (sortDirection === "asc" ? ChevronUpIcon : ChevronDownIcon) : ChevronUpDownIcon;

    return (
        // The main table header cell, clickable to trigger a sort.
        <th
            scope="col"
            className="cursor-pointer px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
            onClick={() => onSort(sortKey)}>
            {/* Container for the label and icon. */}
            <div className="group inline-flex items-center">
                {label}
                {/* The icon container with conditional styling for the active sort column. */}
                <span
                    className={`ml-2 flex-none rounded ${isSorting ? "bg-gray-200 text-gray-900" : "text-gray-400 group-hover:bg-gray-200"}`}>
                    <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
            </div>
        </th>
    );
}
