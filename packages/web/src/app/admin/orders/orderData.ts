import { Order } from "./utils/types";

export const ordersData: Order[] = [
    { orderId: "ORD001", customerName: "Alice Smith", orderDate: "2025-06-15", totalAmount: 15999, status: "Shipped" },
    { orderId: "ORD002", customerName: "Bob Johnson", orderDate: "2025-06-14", totalAmount: 7550, status: "Pending" },
    { orderId: "ORD003", customerName: "Charlie Brown", orderDate: "2025-06-12", totalAmount: 22000, status: "Delivered" },
    { orderId: "ORD004", customerName: "Diana Prince", orderDate: "2025-06-10", totalAmount: 4999, status: "Cancelled" },
    { orderId: "ORD005", customerName: "Clark Kent", orderDate: "2025-06-16", totalAmount: 12500, status: "Pending" },
    { orderId: "ORD006", customerName: "Bruce Wayne", orderDate: "2025-06-13", totalAmount: 30000, status: "Shipped" },
];
