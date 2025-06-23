"use client";

import React from "react";

// Define the type for sort direction.
type SortDirection = "asc" | "desc";

type SortIndicatorProps = {
    isSorted: boolean;
    direction: "ascending" | "descending";
};

// Define the generic props interface for the component.
// <T> allows this component to be used with any data type.
interface SortableHeaderProps<T> {
    label: string; // The text label for the header.
    sortKey: keyof T; // The key of the data model this header corresponds to.
    currentSortKey: keyof T; // The key the table is currently sorted by.
    sortDirection: SortDirection; // The current sort direction ('asc' or 'desc').
    onSort: (key: keyof T) => void; // Callback function to trigger sorting.
    Icon: React.FC<SortIndicatorProps>; // The icon component to display sort status.
}

/**
 * @component SortableHeader
 * @description A reusable, generic table header component that allows for sorting.
 */
export default function SortableHeader<T>({ label, sortKey, currentSortKey, sortDirection, onSort, Icon }: SortableHeaderProps<T>) {
    const isSorting = currentSortKey === sortKey;
    const direction = sortDirection === "asc" ? "ascending" : "descending";

    return (
        <th
            scope="col"
            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer group"
            onClick={() => onSort(sortKey)}>
            <div className="flex items-center">
                {label}
                <Icon isSorted={isSorting} direction={direction} />
            </div>
        </th>
    );
}
