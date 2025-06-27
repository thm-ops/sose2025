/**
 * @interface Order
 * @description Defines the structure for an order object.
 */
export interface Order {
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
export type SortableOrderKeys = keyof Omit<Order, "status">;

/**
 * @type SortConfig
 * @description Defines the structure for the sorting configuration object.
 */
export type SortConfig = {
    key: SortableOrderKeys | null;
    direction: "ascending" | "descending";
};

/**
 * @interface StatItem
 * @description Defines the structure for a stat item.
 */
export interface StatItem {
    name: string;
    value: string;
}
