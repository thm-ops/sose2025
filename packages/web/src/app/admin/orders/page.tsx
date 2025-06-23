"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import AdminHeader from "@/app/admin/AdminHeader.component";

/**
 * @interface Order
 * @description Defines the structure for an order object.
 * @property {string} orderId - The unique identifier for the order.
 * @property {string} customerName - The name of the customer.
 * @property {string} orderDate - The date the order was placed (YYYY-MM-DD).
 * @property {number} totalAmount - The total cost of the order in cents.
 * @property {"Pending" | "Shipped" | "Delivered" | "Cancelled"} status - The current status of the order.
 */
interface Order {
    orderId: string;
    customerName: string;
    orderDate: string;
    totalAmount: number;
    status: "Pending" | "Shipped" | "Delivered" | "Cancelled";
}

/**
 * @type SortableOrderKeys
 * @description Defines the keys of the Order interface that are allowed to be sorted.
 */
type SortableOrderKeys = keyof Omit<Order, "status">;

/**
 * @type SortConfig
 * @description Defines the structure for the sorting configuration object.
 * @property {SortableOrderKeys | null} key - The key of the order object to sort by.
 * @property {'ascending' | 'descending'} direction - The direction of the sort.
 */
type SortConfig = {
    key: SortableOrderKeys | null;
    direction: "ascending" | "descending";
};

/**
 * @constant ordersData
 * @description A mock dataset of orders for demonstration purposes.
 * @type {Order[]}
 */
const ordersData: Order[] = [
    { orderId: "ORD001", customerName: "Alice Smith", orderDate: "2025-06-15", totalAmount: 15999, status: "Shipped" },
    { orderId: "ORD002", customerName: "Bob Johnson", orderDate: "2025-06-14", totalAmount: 7550, status: "Pending" },
    { orderId: "ORD003", customerName: "Charlie Brown", orderDate: "2025-06-12", totalAmount: 22000, status: "Delivered" },
    { orderId: "ORD004", customerName: "Diana Prince", orderDate: "2025-06-10", totalAmount: 4999, status: "Cancelled" },
    { orderId: "ORD005", customerName: "Clark Kent", orderDate: "2025-06-16", totalAmount: 12500, status: "Pending" },
    { orderId: "ORD006", customerName: "Bruce Wayne", orderDate: "2025-06-13", totalAmount: 30000, status: "Shipped" },
];

/**
 * @function formatPrice
 * @description Formats a number in cents into a German Euro currency string.
 * @param {number} priceInCents - The price in cents.
 * @returns {string} The formatted currency string (e.g., "159,99 €").
 */
const formatPrice = (priceInCents: number): string => (priceInCents / 100).toLocaleString("de-DE", { style: "currency", currency: "EUR" });

/**
 * @function formatDate
 * @description Formats a date string into a long German date format.
 * @param {string} dateString - The date string to format (e.g., "2025-06-15").
 * @returns {string} The formatted date string (e.g., "15. Juni 2025").
 */
const formatDate = (dateString: string): string =>
    new Date(dateString).toLocaleDateString("de-DE", { year: "numeric", month: "long", day: "numeric" });

/**
 * @function getStatusStyles
 * @description Returns Tailwind CSS classes based on the order status for styling.
 * @param {Order["status"]} status - The status of the order.
 * @returns {string} A string of Tailwind CSS classes.
 */
const getStatusStyles = (status: Order["status"]): string => {
    switch (status) {
        case "Pending":
            return "bg-yellow-100 text-yellow-800";
        case "Shipped":
            return "bg-blue-100 text-blue-800";
        case "Delivered":
            return "bg-green-100 text-green-800";
        case "Cancelled":
            return "bg-red-100 text-red-800";
        default:
            return "bg-gray-100 text-gray-800";
    }
};

/**
 * @component OrderManagementPage
 * @description The main page component for managing orders. It handles sorting logic and renders the order table.
 */
const OrderManagementPage = () => {
    /**
     * @state {SortConfig} sortConfig - Holds the current sorting state (key and direction).
     */
    const [sortConfig, setSortConfig] = useState<SortConfig>({
        key: "orderDate",
        direction: "descending",
    });

    /**
     * @memo sortedOrders
     * @description Memoizes the sorted orders array. It re-sorts the data only when the sortConfig changes.
     * @returns {Order[]} The sorted array of orders.
     */
    const sortedOrders = useMemo(() => {
        const sortableItems = [...ordersData];
        if (sortConfig.key) {
            sortableItems.sort((a, b) => {
                if (a[sortConfig.key!] < b[sortConfig.key!]) {
                    return sortConfig.direction === "ascending" ? -1 : 1;
                }
                if (a[sortConfig.key!] > b[sortConfig.key!]) {
                    return sortConfig.direction === "ascending" ? 1 : -1;
                }
                return 0;
            });
        }
        return sortableItems;
    }, [sortConfig]);

    /**
     * @function handleSort
     * @description Handles the sorting logic when a table header is clicked.
     * It toggles the sort direction or sets a new sort key.
     * @param {SortableOrderKeys} key - The key of the column to sort by.
     */
    const handleSort = (key: SortableOrderKeys) => {
        let direction: "ascending" | "descending" = "ascending";
        if (sortConfig.key === key && sortConfig.direction === "ascending") {
            direction = "descending";
        }
        setSortConfig({ key, direction });
    };

    return (
        <div>
            <AdminHeader />
            <main className="flex-1 bg-gray-50 pt-[64px]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <OrderPageHeader />
                    <div className="bg-white shadow-md rounded-lg overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <OrderPageTableHead onSort={handleSort} sortConfig={sortConfig} />
                                <OrderPageTableBody orders={sortedOrders} />
                            </table>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

/**
 * @component SortIndicatorIcon
 * @description Displays an SVG icon indicating the sort status (unsorted, ascending, or descending).
 * @param {{ isSorted: boolean, direction: 'ascending' | 'descending' }} props - The component props.
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
 * @component OrderPageHeader
 * @description Renders the main header for the order management page.
 */
const OrderPageHeader = () => (
    <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Order Management</h1>
        <p className="text-sm text-gray-600 mt-1">Alle Orders zum anschauen oder bearbeiten.</p>
    </div>
);

/**
 * @interface OrderPageSortableTableHeadItemProps
 * @description Defines the props for the OrderPageSortableTableHeadItem component.
 */
interface OrderPageSortableTableHeadItemProps {
    name: string;
    sortKey: SortableOrderKeys;
    onSort: (key: SortableOrderKeys) => void;
    sortConfig: SortConfig;
}

/**
 * @component OrderPageSortableTableHeadItem
 * @description Renders a single sortable table header cell.
 * @param {OrderPageSortableTableHeadItemProps} props - The component props.
 */
function OrderPageSortableTableHeadItem({ name, sortKey, onSort, sortConfig }: OrderPageSortableTableHeadItemProps) {
    const isSorted = sortConfig.key === sortKey;
    return (
        <th
            scope="col"
            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer group"
            onClick={() => onSort(sortKey)}>
            <div className="flex items-center">
                {name}
                <SortIndicatorIcon isSorted={isSorted} direction={sortConfig.direction} />
            </div>
        </th>
    );
}

/**
 * @interface OrderPageTableHeadProps
 * @description Defines the props for the OrderPageTableHead component.
 */
interface OrderPageTableHeadProps {
    onSort: (key: SortableOrderKeys) => void;
    sortConfig: SortConfig;
}

/**
 * @component OrderPageTableHead
 * @description Renders the entire table header (`<thead>`) with sortable columns.
 * @param {OrderPageTableHeadProps} props - The component props.
 */
function OrderPageTableHead({ onSort, sortConfig }: OrderPageTableHeadProps) {
    const headers: { name: string; key: SortableOrderKeys }[] = [
        { name: "Bestellnummer", key: "orderId" },
        { name: "Kundenname", key: "customerName" },
        { name: "Bestelldatum", key: "orderDate" },
        { name: "Gesamtbetrag", key: "totalAmount" },
    ];

    return (
        <thead className="bg-gray-50">
            <tr>
                {headers.map((header) => (
                    <OrderPageSortableTableHeadItem
                        key={header.key}
                        name={header.name}
                        sortKey={header.key}
                        onSort={onSort}
                        sortConfig={sortConfig}
                    />
                ))}
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Aktionen
                </th>
            </tr>
        </thead>
    );
}

/**
 * @component OrderPageTableRowData
 * @description Renders a standard data cell (`<td>`) in the table.
 * @param {{ name: string }} props - The component props.
 */
const OrderPageTableRowData = ({ name }: { name: string }) => <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{name}</td>;

/**
 * @component OrderPageTableRowStatus
 * @description Renders a styled status badge cell (`<td>`) for the order.
 * @param {{ status: Order["status"] }} props - The component props.
 */
const OrderPageTableRowStatus = ({ status }: { status: Order["status"] }) => (
    <td className="px-6 py-4 whitespace-nowrap text-sm">
        <span className={`px-2.5 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusStyles(status)}`}>
            {status}
        </span>
    </td>
);

/**
 * @component OrderPageTableRowActions
 * @description Renders the action links ("Anzeigen", "Bearbeiten") for an order row.
 * @param {{ orderId: string }} props - The component props.
 */
function OrderPageTableRowActions({ orderId }: { orderId: string }) {
    return (
        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-right">
            <Link href={`/admin/orders/${orderId}`} className="text-indigo-600 hover:text-indigo-900 mr-4">
                Anzeigen
            </Link>
            <Link href={`/admin/orders/${orderId}?edit=true`} className="text-blue-600 hover:text-blue-900">
                Bearbeiten
            </Link>
        </td>
    );
}

/**
 * @component OrderPageTableBody
 * @description Renders the table body (`<tbody>`) and maps over the orders to create rows.
 * @param {{ orders: Order[] }} props - The component props.
 */
const OrderPageTableBody = ({ orders }: { orders: Order[] }) => (
    <tbody className="bg-white divide-y divide-gray-200">
        {orders.map((order: Order) => (
            <OrderPageTableRow key={order.orderId} order={order} />
        ))}
    </tbody>
);

/**
 * @component OrderPageTableRow
 * @description Renders a single table row (`<tr>`) for an order.
 * @param {{ order: Order }} props - The component props.
 */
function OrderPageTableRow({ order }: { order: Order }) {
    return (
        <tr className="hover:bg-gray-50 transition-colors duration-200">
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500">{order.orderId}</td>
            <OrderPageTableRowData name={order.customerName} />
            <OrderPageTableRowData name={formatDate(order.orderDate)} />
            <OrderPageTableRowData name={formatPrice(order.totalAmount)} />
            <OrderPageTableRowStatus status={order.status} />
            <OrderPageTableRowActions orderId={order.orderId} />
        </tr>
    );
}

export default OrderManagementPage;
