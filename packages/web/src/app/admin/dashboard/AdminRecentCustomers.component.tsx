"use client";
import React, { FunctionComponent } from "react";
import Image from "next/image";
import { Price } from "@/lib/utils/price";
import { OrderStatus } from "@/app/admin/orders/utils/types";
import { getStatusStyles } from "@/app/admin/orders/utils/getStatusStyles";

type Client = {
    id: number;
    name: string;
    imageUrl: string;
    lastOrder: {
        dateTime: string;
        amount: number;
        status: OrderStatus;
    };
};

/**
 * @constant clients
 * @type {Array<Client>}
 * @description Contains the recent customer data including their last order details.
 */
const clients: Client[] = [
    {
        id: 1,
        name: "Max Mustermann",
        imageUrl: "https://api.dicebear.com/9.x/pixel-art-neutral/png?seed=Max%20Mustermann",
        lastOrder: { dateTime: "2025-06-13", amount: 2099, status: OrderStatus.Cancelled },
    },
    {
        id: 2,
        name: "Tom Cook",
        imageUrl: "https://api.dicebear.com/9.x/pixel-art-neutral/png?seed=Tom%20Cook",
        lastOrder: { dateTime: "2025-02-15", amount: 1599, status: OrderStatus.Pending },
    },
    {
        id: 3,
        name: "Reform Corp.",
        imageUrl: "https://api.dicebear.com/9.x/pixel-art-neutral/png?seed=Reform%20Corp",
        lastOrder: { dateTime: "2025-03-10", amount: 799, status: OrderStatus.Delivered },
    },
];

/**
 * @component AdminRecentCustomers
 * @description Displays a list of recent customers with their last order details.
 * @param statuses - A record containing status styles for different order statuses.
 */
const AdminRecentCustomers: FunctionComponent = () => {
    return (
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
                <AdminRecentCustomersHeader />
                <ul role="list" className="mt-6 grid grid-cols-1 gap-x-6 gap-y-8 lg:grid-cols-3 xl:gap-x-8">
                    {clients.map((client) => (
                        <li key={client.id} className="overflow-hidden rounded-xl border border-gray-200">
                            <AdminRecentCustomersInfo client={client} />
                            <dl className="-my-3 divide-y divide-gray-100 px-6 py-4 text-sm/6">
                                <AdminRecentCustomersOrder client={client} />
                                <AdminRecentCustomersAmount client={client} />
                            </dl>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

/**
 * @component AdminRecentCustomersHeader
 * @description Renders the header for the recent customers section.
 */
function AdminRecentCustomersHeader() {
    return (
        <div className="flex items-center justify-between">
            <h2 className="text-base/7 font-semibold text-gray-900">Neueste Kunden</h2>
        </div>
    );
}

/**
 * @component AdminRecentCustomersInfo
 * @description Displays the basic information of a customer including their name and image.
 * @param client - The client object containing id, name, and imageUrl.
 */
function AdminRecentCustomersInfo({ client }: { client: Client }) {
    return (
        <div className="flex items-center gap-x-4 border-b border-gray-900/5 bg-gray-50 p-6">
            <Image
                alt={client.name}
                src={client.imageUrl}
                width={48}
                height={48}
                className="size-12 flex-none rounded-lg bg-white object-cover ring-1 ring-gray-900/10"
            />
            <div className="text-sm/6 font-medium text-gray-900">{client.name}</div>
        </div>
    );
}

/**
 * @component AdminRecentCustomersOrder
 * @description Displays the last order date of a customer.
 * @param client - The client object containing lastOrder details.
 */
function AdminRecentCustomersOrder({ client }: { client: Client }) {
    return (
        <div className="flex justify-between gap-x-4 py-3">
            <dt className="text-gray-500">Letzte Bestellung</dt>
            <dd className="text-gray-700">
                <time dateTime={client.lastOrder.dateTime}>
                    {new Date(client.lastOrder.dateTime).toLocaleDateString("de-DE", {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                    })}
                </time>
            </dd>
        </div>
    );
}

/**
 * @component AdminRecentCustomersAmount
 * @description Displays the amount and status of the last order of a customer.
 * @param client - The client object containing lastOrder details.
 */
function AdminRecentCustomersAmount({ client }: { client: Client }) {
    return (
        <div className="flex justify-between gap-x-4 py-3">
            <dt className="text-gray-500">Betrag</dt>
            <dd className="flex items-start gap-x-2">
                <div className="font-medium text-gray-900">{Price.display(client.lastOrder.amount)}</div>
                <div className={`${getStatusStyles(client.lastOrder.status)} rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset`}>
                    {client.lastOrder.status}
                </div>
            </dd>
        </div>
    );
}

export default AdminRecentCustomers;
