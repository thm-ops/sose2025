export interface Order {
    orderId: string;
    customerName: string;
    orderDate: string;
    totalAmount: number;
    status: "Pending" | "Shipped" | "Delivered" | "Cancelled";
}

export type SortableOrderKeys = keyof Omit<Order, "status">;

export type SortConfig = {
    key: SortableOrderKeys | null;
    direction: "ascending" | "descending";
};

export interface StatItem {
    name: string;
    value: string;
}
