"use client";

import React from "react";

// Beispiel-Daten
const ordersData = [
    { orderId: "ORD001", customerName: "Alice Smith", orderDate: "2025-06-15", totalAmount: 15999, status: "Shipped" },
    { orderId: "ORD002", customerName: "Bob Johnson", orderDate: "2025-06-14", totalAmount: 7550, status: "Pending" },
    { orderId: "ORD003", customerName: "Charlie Brown", orderDate: "2025-06-12", totalAmount: 22000, status: "Delivered" },
    { orderId: "ORD004", customerName: "Diana Prince", orderDate: "2025-06-10", totalAmount: 4999, status: "Cancelled" },
    { orderId: "ORD005", customerName: "Clark Kent", orderDate: "2025-06-16", totalAmount: 12500, status: "Pending" },
    { orderId: "ORD006", customerName: "Bruce Wayne", orderDate: "2025-06-13", totalAmount: 30000, status: "Shipped" },
];

const formatPrice = (priceInCents: number): string => (priceInCents / 100).toLocaleString("de-DE", { style: "currency", currency: "EUR" });

const formatDate = (dateString: string): string =>
    new Date(dateString).toLocaleDateString("de-DE", { year: "numeric", month: "long", day: "numeric" });

interface Props {
    orderId: string;
}

const OrderDetailPage: React.FC<Props> = ({ orderId }) => {
    const order = ordersData.find((o) => o.orderId === orderId);

    if (!order) {
        return (
            <div className="p-6">
                <h1 className="text-xl font-bold">Order not found</h1>
                <a href="/admin" className="text-blue-500 underline mt-4 block">
                    ← Zurück
                </a>
            </div>
        );
    }

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold">Order {order.orderId}</h1>
            <p>Kunde: {order.customerName}</p>
            <p>Datum: {formatDate(order.orderDate)}</p>
            <p>Betrag: {formatPrice(order.totalAmount)}</p>
            <p>Status: {order.status}</p>
            <a href="/admin" className="text-blue-500 underline mt-4 block">
                ← Zurück
            </a>
        </div>
    );
};

export default OrderDetailPage;
