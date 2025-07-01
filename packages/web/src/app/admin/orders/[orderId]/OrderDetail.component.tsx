"use client";

import React from "react";
import Link from "next/link";
import { UserCircleIcon, CalendarIcon, CreditCardIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { Price } from "@/lib/utils/price";

export enum OrderStatus {
    Pending = "Pending",
    Shipped = "Shipped",
    Delivered = "Delivered",
    Cancelled = "Cancelled",
}

export interface Order {
    orderId: string;
    createdAt: Date;
    totalPrice: number;
    status: OrderStatus;
    customerId: number;
    customer: {
        id: number;
        firstName: string;
        lastName: string;
        email: string;
        phone: string;
        street: string;
        houseNumber: string;
        postalCode: string;
        city: string;
        country: string;
    };
    items: Array<{
        id: number;
        duckId: number;
        quantity: number;
        duck: {
            id: number;
            name: string;
            price: number;
            color: string;
            material: string;
            size: string;
            weight: number;
            description: string;
        };
    }>;
}

// Mock data based on Prisma schema
const ducksData = [
    {
        id: 1,
        name: "Classic Yellow Duck",
        price: 1299,
        color: "yellow",
        material: "Rubber",
        size: "m",
        weight: 0.15,
        description: "Traditional rubber duck",
    },
    {
        id: 2,
        name: "Pirate Duck",
        price: 1599,
        color: "black",
        material: "Vinyl",
        size: "l",
        weight: 0.18,
        description: "Ahoy matey duck with pirate hat",
    },
    {
        id: 3,
        name: "Rainbow Duck",
        price: 2199,
        color: "red",
        material: "Silicone",
        size: "xl",
        weight: 0.25,
        description: "Colorful rainbow duck",
    },
    {
        id: 4,
        name: "Mini Duck Set",
        price: 899,
        color: "white",
        material: "Plastic",
        size: "s",
        weight: 0.08,
        description: "Set of 3 mini ducks",
    },
];

const ordersData = [
    {
        orderId: "ORD001",
        createdAt: new Date("2025-06-15T10:30:00Z"),
        totalPrice: 15999,
        status: OrderStatus.Delivered,
        customerId: 1,
        customer: {
            id: 1,
            firstName: "Alice",
            lastName: "Smith",
            email: "alice.smith@email.com",
            phone: "+49 176 12345678",
            street: "Musterstraße",
            houseNumber: "123",
            postalCode: "10115",
            city: "Berlin",
            country: "Germany",
        },
        items: [
            { id: 1, duckId: 1, quantity: 2, duck: ducksData[0] },
            { id: 2, duckId: 2, quantity: 1, duck: ducksData[1] },
        ],
    },
    {
        orderId: "ORD002",
        createdAt: new Date("2025-06-14T14:22:00Z"),
        totalPrice: 7550,
        status: OrderStatus.Pending,
        customerId: 2,
        customer: {
            id: 2,
            firstName: "Bob",
            lastName: "Johnson",
            email: "bob.johnson@email.com",
            phone: "+49 175 87654321",
            street: "Hauptstraße",
            houseNumber: "456",
            postalCode: "20095",
            city: "Hamburg",
            country: "Germany",
        },
        items: [
            { id: 3, duckId: 3, quantity: 1, duck: ducksData[2] },
            { id: 4, duckId: 4, quantity: 1, duck: ducksData[3] },
        ],
    },
    {
        orderId: "ORD003",
        createdAt: new Date("2025-06-12T10:30:00Z"),
        totalPrice: 22000,
        status: OrderStatus.Shipped,
        customerId: 3,
        customer: {
            id: 3,
            firstName: "Charlie",
            lastName: "Brown",
            email: "charlie.brown@email.com",
            phone: "+49 174 98765432",
            street: "Bahnhofstraße",
            houseNumber: "789",
            postalCode: "50667",
            city: "Köln",
            country: "Germany",
        },
        items: [{ id: 5, duckId: 3, quantity: 1, duck: ducksData[2] }],
    },
    {
        orderId: "ORD004",
        createdAt: new Date("2025-06-15T10:30:00Z"),
        totalPrice: 4999,
        status: OrderStatus.Pending,
        customerId: 4,
        customer: {
            id: 4,
            firstName: "Diana",
            lastName: "Prince",
            email: "diana.prince@email.com",
            phone: "+49 173 11223344",
            street: "Königsallee",
            houseNumber: "321",
            postalCode: "40212",
            city: "Düsseldorf",
            country: "Germany",
        },
        items: [
            { id: 6, duckId: 4, quantity: 5, duck: ducksData[3] },
            { id: 7, duckId: 1, quantity: 1, duck: ducksData[0] },
        ],
    },
    {
        orderId: "ORD005",
        createdAt: new Date("2025-06-16T16:45:00Z"),
        totalPrice: 12500,
        status: OrderStatus.Cancelled,
        customerId: 5,
        customer: {
            id: 5,
            firstName: "Clark",
            lastName: "Kent",
            email: "clark.kent@email.com",
            phone: "+49 172 55443322",
            street: "Marienplatz",
            houseNumber: "654",
            postalCode: "80331",
            city: "München",
            country: "Germany",
        },
        items: [
            { id: 8, duckId: 1, quantity: 4, duck: ducksData[0] },
            { id: 9, duckId: 2, quantity: 3, duck: ducksData[1] },
        ],
    },
    {
        orderId: "ORD006",
        createdAt: new Date("2025-06-13T11:20:00Z"),
        totalPrice: 30000,
        status: OrderStatus.Delivered,
        customerId: 6,
        customer: {
            id: 6,
            firstName: "Bruce",
            lastName: "Wayne",
            email: "bruce.wayne@email.com",
            phone: "+49 171 99887766",
            street: "Unter den Linden",
            houseNumber: "987",
            postalCode: "10117",
            city: "Berlin",
            country: "Germany",
        },
        items: [
            { id: 10, duckId: 3, quantity: 10, duck: ducksData[2] },
            { id: 11, duckId: 2, quantity: 5, duck: ducksData[1] },
        ],
    },
];


const formatDate = (date: string | Date): string => {
    const dateObj = date instanceof Date ? date : new Date(date);
    return dateObj.toLocaleDateString("de-DE", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
};

const getStatusStyles = (status: OrderStatus): string => {
    switch (status) {
        case OrderStatus.Delivered:
            return "bg-green-50 text-green-600 ring-green-600/20";
        case OrderStatus.Shipped:
            return "bg-blue-50 text-blue-600 ring-blue-600/20";
        case OrderStatus.Pending:
            return "bg-yellow-100 text-yellow-800 ring-yellow-600/20";
        case OrderStatus.Cancelled:
            return "bg-red-50 text-red-600 ring-red-600/20";
        default:
            return "bg-gray-50 text-gray-600 ring-gray-600/20";
    }
};

const getStatusText = (status: OrderStatus): string => {
    return status;
};

interface Props {
    orderId: string;
}

const OrderDetailPage: React.FC<Props> = ({ orderId }) => {
    const order = ordersData.find((o) => o.orderId === orderId);

    if (!order) {
        return (
            <div className="min-h-screen bg-gray-50 p-6">
                <div className="max-w-2xl mx-auto">
                    <h1 className="text-xl font-bold">Bestellung nicht gefunden</h1>
                    <Link href="/admin/orders" className="text-blue-500 underline mt-4 block">
                        ← Zurück zur Übersicht
                    </Link>
                </div>
            </div>
        );
    }

    // Helper function to get ISO string, as order.createdAt is a string
    const getIsoString = (dateString: Date): string => {
        // Create a Date object from the string and then call toISOString
        return new Date(dateString).toISOString();
    };

    // Function to format the full address for display
    const formatFullAddress = (customer: Order['customer']): string => {
        const houseNum = customer.houseNumber ? ` ${customer.houseNumber}` : '';
        return `${customer.street}${houseNum}, ${customer.postalCode} ${customer.city}, ${customer.country}`;
    };


    return (
        <main className="bg-gray-50 min-h-screen">
            <header className="relative isolate pt-16">
                <div aria-hidden="true" className="absolute inset-0 -z-10 overflow-hidden">
                    <div className="absolute top-full left-16 -mt-16 transform-gpu opacity-50 blur-3xl xl:left-1/2 xl:-ml-80">
                        <div
                            style={{
                                clipPath:
                                    "polygon(100% 38.5%, 82.6% 100%, 60.2% 37.7%, 52.4% 32.1%, 47.5% 41.8%, 45.2% 65.6%, 27.5% 23.4%, 0.1% 35.3%, 17.9% 0%, 27.7% 23.4%, 76.2% 2.5%, 74.2% 56%, 100% 38.5%)",
                            }}
                            className="aspect-[1154/678] w-[72.125rem] bg-gradient-to-br from-[#FF80B5] to-[#9089FC]"
                        />
                    </div>
                    <div className="absolute inset-x-0 bottom-0 h-px bg-gray-900/5" />
                </div>

                <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
                    <div className="mx-auto flex max-w-2xl items-center justify-between gap-x-8 lg:mx-0 lg:max-w-none">
                        <div className="flex items-center gap-x-6">
                            <div className="size-16 flex-none rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center ring-1 ring-gray-900/10">
                                <span className="text-2xl">🦆</span>
                            </div>
                            <h1>
                                <div className="text-sm/6 text-gray-500">
                                    Duck Order <span className="text-gray-700">#{order.orderId}</span>
                                </div>
                                <div className="mt-1 text-base font-semibold text-gray-900">
                                    {order.customer.firstName} {order.customer.lastName}
                                </div>
                            </h1>
                        </div>
                        <div className="flex items-center gap-x-4 sm:gap-x-6">
                            {/* Edit Order Button */}
                            <Link
                                href={`/admin/orders/${order.orderId}/edit`} // Placeholder link for editing
                                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                                Edit Order
                            </Link>
                            <Link href="/admin/orders" className="text-sm/6 font-semibold text-gray-900">
                                Back to Orders
                            </Link>
                        </div>
                    </div>
                </div>
            </header>

            <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
                <div className="mx-auto grid max-w-2xl grid-cols-1 grid-rows-1 items-start gap-x-8 gap-y-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                    {/* Order Summary */}
                    <div className="lg:col-start-3 lg:row-end-1">
                        <h2 className="sr-only">Summary</h2>
                        <div className="rounded-lg bg-white shadow-sm ring-1 ring-gray-900/5">
                            <dl className="flex flex-wrap">
                                <div className="flex-auto pt-6 pl-6">
                                    <dt className="text-sm/6 font-semibold text-gray-900">Total Amount</dt>
                                    <dd className="mt-1 text-base font-semibold text-gray-900">{Price.display(order.totalPrice)}</dd>
                                </div>
                                <div className="flex-none self-end px-6 pt-4">
                                    <dt className="sr-only">Status</dt>
                                    <dd
                                        className={`rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${getStatusStyles(order.status)}`}>
                                        {getStatusText(order.status)}
                                    </dd>
                                </div>
                                <div className="mt-6 flex w-full flex-none gap-x-4 border-t border-gray-900/5 px-6 pt-6">
                                    <dt className="flex-none">
                                        <span className="sr-only">Customer Name</span>
                                        <UserCircleIcon aria-hidden="true" className="h-6 w-5 text-gray-400" />
                                    </dt>
                                    <dd className="text-sm/6 font-medium text-gray-900">
                                        {order.customer.firstName} {order.customer.lastName}
                                    </dd>
                                </div>
                                <div className="mt-4 flex w-full flex-none gap-x-4 px-6">
                                    <dt className="flex-none">
                                        <span className="sr-only">Order Date</span>
                                        <CalendarIcon aria-hidden="true" className="h-6 w-5 text-gray-400" />
                                    </dt>
                                    <dd className="text-sm/6 text-gray-500">
                                        {/* Use getIsoString here */}
                                        <time dateTime={getIsoString(order.createdAt)}>{formatDate(order.createdAt)}</time>
                                    </dd>
                                </div>
                                <div className="mt-4 flex w-full flex-none gap-x-4 px-6">
                                    <dt className="flex-none">
                                        <span className="sr-only">Payment Status</span>
                                        <CreditCardIcon aria-hidden="true" className="h-6 w-5 text-gray-400" />
                                    </dt>
                                    <dd className="text-sm/6 text-gray-500">
                                        Payment{" "}
                                        {order.status === OrderStatus.Delivered || order.status === OrderStatus.Shipped
                                            ? "Completed"
                                            : "Pending"}
                                    </dd>
                                </div>
                            </dl>
                            <div className="mt-6 border-t border-gray-900/5 px-6 py-6">
                                <a href="#" className="text-sm/6 font-semibold text-gray-900">
                                    Download invoice <span aria-hidden="true">&rarr;</span>
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Order Details */}
                    <div className="-mx-4 px-4 py-8 bg-white shadow-sm ring-1 ring-gray-900/5 sm:mx-0 sm:rounded-lg sm:px-8 sm:pb-14 lg:col-span-2 lg:row-span-2 lg:row-end-2 xl:px-16 xl:pt-16 xl:pb-20">
                        <h2 className="text-base font-semibold text-gray-900">Order Details</h2>
                        <dl className="mt-6 grid grid-cols-1 text-sm/6 sm:grid-cols-2">
                            <div className="sm:pr-4">
                                <dt className="inline text-gray-500">Order ID</dt>{" "}
                                <dd className="inline text-gray-700">#{order.orderId}</dd>
                            </div>
                            <div className="mt-2 sm:mt-0 sm:pl-4">
                                <dt className="inline text-gray-500">Order Date</dt>{" "}
                                <dd className="text-sm/6 text-gray-500">
                                    {/* Use getIsoString here */}
                                    <time dateTime={getIsoString(order.createdAt)}>{formatDate(order.createdAt)}</time>
                                </dd>
                            </div>
                            <div className="mt-6 border-t border-gray-900/5 pt-6 sm:pr-4">
                                <dt className="font-semibold text-gray-900">Customer Information</dt>
                                <dd className="mt-2 text-gray-500">
                                    <div className="font-medium text-gray-900">
                                        {order.customer.firstName} {order.customer.lastName}
                                    </div>
                                    <div>{order.customer.email}</div>
                                    <div>{order.customer.phone}</div>
                                </dd>
                            </div>
                            <div className="mt-6 border-t border-gray-900/5 pt-6 sm:pl-4">
                                <dt className="font-semibold text-gray-900">Delivery Address</dt>
                                <dd className="mt-2 text-gray-500">{formatFullAddress(order.customer)}</dd>
                            </div>
                        </dl>

                        {/* Duck Items Table */}
                        <table className="mt-16 w-full text-left text-sm/6 whitespace-nowrap">
                            <colgroup>
                                <col className="w-full" />
                                <col />
                                <col />
                                <col />
                            </colgroup>
                            <thead className="border-b border-gray-200 text-gray-900">
                                <tr>
                                    <th scope="col" className="px-0 py-3 font-semibold">
                                        Duck
                                    </th>
                                    <th scope="col" className="hidden py-3 pr-0 pl-8 text-right font-semibold sm:table-cell">
                                        Quantity
                                    </th>
                                    <th scope="col" className="py-3 pr-0 pl-8 text-right font-semibold">
                                        Unit Price
                                    </th>
                                    <th scope="col" className="py-3 pr-0 pl-8 text-right font-semibold">
                                        Total
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {order.items.map((item) => (
                                    <tr key={item.id} className="border-b border-gray-100">
                                        <td className="px-0 py-5 align-top flex">
                                            <Image
                                                src={"https://picsum.photos/100/100?random=" + item.duck.id}
                                                alt={item.duck.name}
                                                width={50}
                                                height={50}
                                                align-item="center"
                                                className="inline-block mr-4 rounded"
                                            />
                                            <div>
                                                <div className="truncate font-medium text-gray-900">{item.duck.name}</div>
                                                <div className="truncate text-gray-500">
                                                    {item.duck.color} • {item.duck.size} •{" "}
                                                    {item.duck.material}
                                                </div>
                                                <div className="truncate text-gray-400 text-xs">Weight: {item.duck.weight}kg</div>
                                            </div>
                                        </td>

                                        <td
                                            className={`hidden py-5 pr-0 pl-8 text-right align-top text-gray-700 tabular-nu${"ms"} sm:table-cell`}>
                                            {item.quantity}
                                        </td>
                                        <td className={`py-5 pr-0 pl-8 text-right align-top text-gray-700 tabular-nu${"ms"}`}>
                                            {Price.display(item.duck.price)}
                                        </td>
                                        <td className={`py-5 pr-0 pl-8 text-right align-top text-gray-700 tabular-nu${"ms"}`}>
                                            {Price.display(item.duck.price * item.quantity)}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                            <tfoot>
                                <tr>
                                    <th scope="row" className="pt-6 font-semibold text-gray-900" colSpan={3}>
                                        Total
                                    </th>
                                    <td className={`pt-6 pr-0 pl-8 text-right font-semibold text-gray-900 tabular-nu${"ms"}`}>
                                        {Price.display(order.totalPrice)}
                                    </td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default OrderDetailPage;