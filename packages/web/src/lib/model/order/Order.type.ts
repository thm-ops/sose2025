/**
 * @interface Order
 * @description Defines the structure for an order object.
 */
export enum OrderStatus {
    Pending = "Pending",
    Shipped = "Shipped",
    Delivered = "Delivered",
    Cancelled = "Cancelled",
}

export interface Order {
    orderId: string;
    customerName: string;
    orderDate: Date;
    totalAmount: number;
}

/**
 * @type SortableOrderKeys
 * @description Defines the keys of the Order interface that are allowed to be sorted.
 */
export type SortableOrderKeys = keyof Omit<Order, "customer" | "items">;

/**
 * @type SortConfig
 * @description Defines the structure for the sorting configuration object.
 */
export type SortConfig = {
    key: SortableOrderKeys | null;
    direction: SortDirection; // Changed to use the enum
};

export enum SortDirection {
    Ascending = "ascending",
    Descending = "descending",
}

/**
 * @interface StatItem
 * @description Defines the structure for a stat item.
 */
export interface StatItem {
    name: string;
    value: string;
}
