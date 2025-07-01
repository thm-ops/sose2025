import { Order } from "./utils/types";

export const ordersData: Order[] = [
    { orderId: "ORD001", customerName: "Alice Smith", orderDate: new Date("2025-06-15"), totalAmount: 15999, status: "Shipped" as Order["status"] },
    { orderId: "ORD002", customerName: "Bob Johnson", orderDate: new Date("2025-06-14"), totalAmount: 7550, status: "Pending" as Order["status"] },
    { orderId: "ORD003", customerName: "Charlie Brown", orderDate: new Date("2025-06-16"), totalAmount: 22000, status: "Delivered" as Order["status"] },
    { orderId: "ORD004", customerName: "Diana Prince", orderDate: new Date("2025-05-12"), totalAmount: 4999, status: "Cancelled" as Order["status"] },
    { orderId: "ORD005", customerName: "Clark Kent", orderDate: new Date("2025-06-02"), totalAmount: 12500, status: "Pending" as Order["status"] },
    { orderId: "ORD006", customerName: "Bruce Wayne", orderDate: new Date("2025-06-24"), totalAmount: 30000, status: "Shipped" as Order["status"] },
];
