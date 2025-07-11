"use client";
import React, { Fragment, FunctionComponent } from "react";
import Link from "next/link";
import { OrderStatus } from "@/app/admin/orders/utils/types";
import { getStatusStyles } from "@/app/admin/orders/utils/getStatusStyles";
import { Price } from "@/lib/utils/price";

/**
 * @constant days
 * @type {Array<{ dateTime: string, transactions: Array<{ id: number, orderNumber: string, amount: number, status: OrderStatus, customer: string, itemCount: number }> }>}
 * @description Contains the recent transaction data grouped by day.
 */
const days: Array<{
    dateTime: string;
    transactions: Array<{ id: number; orderNumber: string; amount: number; status: OrderStatus; customer: string; itemCount: number }>;
}> = [
    {
        dateTime: "2023-03-22",
        transactions: [
            {
                id: 1,
                orderNumber: "ORD001",
                amount: 2099,
                status: OrderStatus.Delivered,
                customer: "Max Mustermann",
                itemCount: 3,
            },
            {
                id: 2,
                orderNumber: "ORD002",
                amount: 1599,
                status: OrderStatus.Cancelled,
                customer: "Tom Cook",
                itemCount: 2,
            },
            {
                id: 3,
                orderNumber: "ORD003",
                amount: 799,
                status: OrderStatus.Pending,
                customer: "Reform Corp.",
                itemCount: 1,
            },
        ],
    },
    {
        dateTime: "2023-03-21",
        transactions: [
            {
                id: 4,
                orderNumber: "ORD004",
                amount: 1299,
                status: OrderStatus.Shipped,
                customer: "Jane Doe",
                itemCount: 5,
            },
        ],
    },
];

/**
 * @component AdminRecentOrders
 * @description Displays a list of recent orders with their statuses, prices, and customer information.
 */
const AdminRecentOrders: FunctionComponent = () => {
    return (
        <div>
            <AdminRecentOrdersHeader />
            <div className="mt-6 overflow-hidden border-t border-gray-100">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
                        <table className="w-full text-left">
                            <tbody>
                                {days.map((day) => (
                                    <Fragment key={day.dateTime}>
                                        <AdminRecentOrdersDayHeader day={day} />
                                        {day.transactions.map((transaction) => (
                                            <tr key={transaction.id}>
                                                <AdminRecentOrdersTransactionStatus transaction={transaction} />
                                                <AdminRecentOrdersTransactionPrice transaction={transaction} />
                                                <AdminRecentOrdersTransactionInfo transaction={transaction} />
                                            </tr>
                                        ))}
                                    </Fragment>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

/**
 * @component AdminRecentOrdersHeader
 * @description Renders the header for the recent orders section in the admin dashboard.
 */
function AdminRecentOrdersHeader() {
    return (
        <div className="flex items-center justify-between mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-base/7 font-semibold text-gray-900">Aktuelle Transaktionen</h2>
            <Link href="/admin/orders" className="text-sm/6 font-semibold text-indigo-600 hover:text-indigo-500">
                Alle sehen
            </Link>
        </div>
    );
}

/**
 * @component AdminRecentOrdersDayHeader
 * @description Renders the header for each day in the recent orders table.
 * @param day - An object containing the date and dateTime for the header.
 */
function AdminRecentOrdersDayHeader({ day }: { day: { dateTime: string } }) {
    return (
        <tr className="text-sm/6 text-gray-900">
            <th scope="colgroup" colSpan={3} className="relative isolate py-2 font-semibold">
                <time dateTime={day.dateTime}>
                    {new Date(day.dateTime).toLocaleDateString("de-DE", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                    })}
                </time>
                <div className="absolute inset-y-0 right-full -z-10 w-screen border-b border-gray-200 bg-gray-50" />
                <div className="absolute inset-y-0 left-0 -z-10 w-screen border-b border-gray-200 bg-gray-50" />
            </th>
        </tr>
    );
}

/**
 * @component AdminRecentOrdersTransactionStatus
 * @description Renders the status of a transaction, including the customer name and status label.
 * @param transaction - An object containing the customer name and status of the transaction.
 * @param statuses - A record containing the CSS classes for different transaction statuses.
 */
function AdminRecentOrdersTransactionStatus({ transaction }: { transaction: { customer: string; status: OrderStatus } }) {
    return (
        <td className="relative py-5 pr-6">
            <div className="flex gap-x-6">
                <div className="flex-auto">
                    <div className="flex items-start gap-x-3">
                        <div className="text-sm/6 font-medium text-gray-900">{transaction.customer}</div>
                        <div
                            className={`${getStatusStyles(transaction.status)} rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset`}>
                            {transaction.status}
                        </div>
                    </div>
                </div>
            </div>
            <div className="absolute right-full bottom-0 h-px w-screen bg-gray-100" />
            <div className="absolute bottom-0 left-0 h-px w-screen bg-gray-100" />
        </td>
    );
}

/**
 * @component AdminRecentOrdersTransactionPrice
 * @description Renders the price and item count of a transaction.
 * @param transaction - An object containing the amount and item count of the transaction.
 */
function AdminRecentOrdersTransactionPrice({ transaction }: { transaction: { amount: number; itemCount: number } }) {
    return (
        <td className="hidden py-5 pr-6 sm:table-cell">
            <div className="text-sm/6 text-gray-900 font-semibold">{Price.display(transaction.amount)}</div>
            <div className="mt-1 text-xs/5 text-gray-500">{transaction.itemCount} Artikel</div>
        </td>
    );
}

/**
 * @component AdminRecentOrdersTransactionInfo
 * @description Renders a link to view the order details and displays the order number.
 * @param transaction - An object containing the order number of the transaction.
 */
function AdminRecentOrdersTransactionInfo({ transaction }: { transaction: { orderNumber: string } }) {
    return (
        <td className="py-5 text-right">
            <div className="flex justify-end">
                <Link
                    href={"/admin/orders/" + transaction.orderNumber}
                    className="text-sm/6 font-medium text-indigo-600 hover:text-indigo-500">
                    Ansehen
                </Link>
            </div>
            <div className="mt-1 text-xs/5 text-gray-500">
                Bestellung <span className="text-gray-900">#{transaction.orderNumber}</span>
            </div>
        </td>
    );
}

export default AdminRecentOrders;
