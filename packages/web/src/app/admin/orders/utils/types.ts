/**
 * @enum OrderStatus
 * @description Defines the possible statuses for an order.
 */
export enum OrderStatus {
    Pending = "Pending",
    Shipped = "Shipped",
    Delivered = "Delivered",
    Cancelled = "Cancelled",
}

/**
 * @interface Order
 * @description Defines the structure for an order object.
 */
export interface Order {
    orderId: string;
    customerName: string;
    orderDate: Date;
    totalAmount: number;
    status: OrderStatus;
}

/**
 * @type SortableOrderKeys
 * @description Defines the keys of the Order interface that are allowed to be sorted.
 * 'status' is omitted as it represents the order's state rather than a primary sorting key in this context.
 */
export type SortableOrderKeys = keyof Omit<Order, "status">;

/**
 * @enum SortDirection
 * @description Defines the possible directions for sorting.
 */
export enum SortDirection {
    Ascending = "ascending",
    Descending = "descending",
}

/**
 * @type SortConfig
 * @description Defines the structure for the sorting configuration object.
 */
export type SortConfig = {
    key: SortableOrderKeys | null;
    direction: SortDirection;
};

/**
 * @interface StatItem
 * @description Defines the structure for a stat item.
 */
export interface StatItem {
    name: string;
    value: string;
}
