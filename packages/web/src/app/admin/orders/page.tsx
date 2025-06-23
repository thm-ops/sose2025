import React from "react";
import AdminHeader from "@/app/admin/AdminHeader.component";

/**
 * @interface Order
 * @description Represents an order in the order management system.
 * @property {string} orderId - Unique identifier for the order.
 * @property {string} customerName - Name of the customer who placed the order.
 * @property {string} orderDate - Date when the order was placed, stored as a string for simplicity.
 * @property {number} totalAmount - Total amount of the order in cents.
 * @property {"Pending" | "Shipped" | "Delivered" | "Cancelled"} status - Current status of the order.
 */
interface Order {
    orderId: string;
    customerName: string;
    orderDate: string; // Storing as string for simplicity, could be Date object
    totalAmount: number; // In cents
    status: "Pending" | "Shipped" | "Delivered" | "Cancelled";
}

/**
 * @constant ordersData
 * @type {Array<Order>}
 * @description Contains a list of orders with details such as order ID, customer name, order date, total amount, and status.
 */
const ordersData: Order[] = [
    {
        orderId: "ORD001",
        customerName: "Alice Smith",
        orderDate: "2025-06-15",
        totalAmount: 15999,
        status: "Shipped",
    },
    {
        orderId: "ORD002",
        customerName: "Bob Johnson",
        orderDate: "2025-06-14",
        totalAmount: 7550,
        status: "Pending",
    },
    {
        orderId: "ORD003",
        customerName: "Charlie Brown",
        orderDate: "2025-06-12",
        totalAmount: 22000,
        status: "Delivered",
    },
    {
        orderId: "ORD004",
        customerName: "Diana Prince",
        orderDate: "2025-06-10",
        totalAmount: 4999,
        status: "Cancelled",
    },
    {
        orderId: "ORD005",
        customerName: "Clark Kent",
        orderDate: "2025-06-16",
        totalAmount: 12500,
        status: "Pending",
    },
    {
        orderId: "ORD006",
        customerName: "Bruce Wayne",
        orderDate: "2025-06-13",
        totalAmount: 30000,
        status: "Shipped",
    },
];

/**
 * @function formatPrice
 * @description Formats a price in cents to a human-readable currency string
 * @param {number} priceInCents - The price in cents to format.
 * @return {string} The formatted price string in Euro currency format.
 * @example
 * formatPrice(15999); // "159,99 €"
 */
const formatPrice = (priceInCents: number): string => {
    return (priceInCents / 100).toLocaleString("de-DE", {
        style: "currency",
        currency: "EUR",
    });
};

/**
 * @function formatDate
 * @description Formats a date string to a more readable format.
 * @param {string} dateString - The date string to format.
 * @return {string} The formatted date string.
 * @example
 * formatDate("2025-06-15"); // "15. Juni 2025"
 */
const formatDate = (dateString: string): string => {
    const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString("de-DE", options);
};

/**
 * @function getStatusStyles
 * @description Returns the appropriate Tailwind CSS classes based on the order status.
 * @param {string} status - The status of the order.
 * @return {string} The Tailwind CSS classes for the given status.
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
 * @description The main component for the Order Management page, displaying a list of orders in a table format.
 */
const OrderManagementPage = () => {
    return (
        <div>
            <AdminHeader />
            <main className="flex-1 bg-gray-50 pt-[64px]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <OrderPageHeader />
                    <div className="bg-white shadow-md rounded-lg overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <OrderPageTableHead />
                                <OrderPageTableBody />
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
 * @description Displays a sort indicator icon used in table headers to indicate sortable columns.
 */
function SortIndicatorIcon() {
    return (
        <span className="ml-1.5 opacity-60">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="inline-block">
                <path d="m18 15-6-6-6 6" />
            </svg>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="inline-block -mt-2">
                <path d="m6 9 6 6 6-6" />
            </svg>
        </span>
    );
}

/**
 * @component OrderPageHeader
 * @description Renders the header for the Order Management page, including the title and description.
 */
function OrderPageHeader() {
    return (
        <div className="mb-6">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Order Management</h1>
            <p className="text-sm text-gray-600 mt-1">View and manage all customer orders.</p>
        </div>
    );
}

/**
 * @component OrderPageSortableTableHeadItem
 * @description Renders a sortable table header cell with the given name.
 * @param {Object} name - The name to display in the header cell.
 */
function OrderPageSortableTableHeadItem({ name }: { name: string }) {
    return (
        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            <div className="flex items-center">
                {name}
                <SortIndicatorIcon />
            </div>
        </th>
    );
}

/**
 * @component OrderPageTableHead
 * @description Renders the table header for the Order Management page.
 */
function OrderPageTableHead() {
    return (
        <thead className="bg-gray-50">
            <tr>
                <OrderPageSortableTableHeadItem name="Bestellnummer" />
                <OrderPageSortableTableHeadItem name="Kundenname" />
                <OrderPageSortableTableHeadItem name="Bestelldatum" />
                <OrderPageSortableTableHeadItem name="Gesamtbetrag" />
                <OrderPageSortableTableHeadItem name="Status" />
                <th scope="col" className="py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <div className="flex items-center">Aktionen</div>
                </th>
            </tr>
        </thead>
    );
}

/**
 * @component OrderPageTableRowData
 * @description Renders a table row item for displaying order data such as order ID, customer name, etc.
 * @param {Object} name - The name of the data item to display in the row.
 */
function OrderPageTableRowData({ name }: { name: string }) {
    return <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500">{name}</td>;
}

/**
 * @component OrderPageTableRowStatus
 * @description Renders the status of an order in the table row, applying appropriate styles based on the status.
 * @param {Object} status - The status of the order to display in the row.
 */
function OrderPageTableRowStatus({ status }: { status: Order["status"] }) {
    const statusStyles = getStatusStyles(status);
    return (
        <td className="px-6 py-4 whitespace-nowrap text-sm">
            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusStyles}`}>{status}</span>
        </td>
    );
}

/**
 * @component OrderPageTableRowActions
 * @description Renders action buttons for each order in the table row.
 */
function OrderPageTableRowActions() {
    return (
        <td className="py-4 whitespace-nowrap text-sm font-medium">
            <a href="#" className="text-indigo-600 hover:text-indigo-900 mr-4">
                Anzeigen
            </a>
            <a href="#" className="text-blue-600 hover:text-blue-900">
                Bearbeiten
            </a>
        </td>
    );
}

/**
 * @component OrderPageTableBody
 * @description Renders the table body for the Order Management page, displaying each order.
 */
function OrderPageTableBody() {
    return (
        <tbody className="bg-white divide-y divide-gray-200">
            {ordersData.map((order: Order) => (
                <OrderPageTableRow key={order.orderId} order={order} />
            ))}
        </tbody>
    );
}

/**
 * @component OrderPageTableRow
 * @description Renders a table row for each order, displaying order details and actions.
 */
function OrderPageTableRow({ order }: { order: Order }) {
    return (
        <tr className="hover:bg-gray-50 transition-colors duration-200">
            <OrderPageTableRowData name={order.orderId} />
            <OrderPageTableRowData name={order.customerName} />
            <OrderPageTableRowData name={formatDate(order.orderDate)} />
            <OrderPageTableRowData name={formatPrice(order.totalAmount)} />
            <OrderPageTableRowStatus status={order.status} />
            <OrderPageTableRowActions />
        </tr>
    );
}

export default OrderManagementPage;
