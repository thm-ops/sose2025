enum OrderStatus {
    Pending = 'Pending',
    Processing = 'Processing',
    Shipped = 'Shipped',
    Delivered = 'Delivered',
    Cancelled = 'Cancelled',
    Refunded = 'Refunded',
}

interface Order {
    id: string;
    customerName: string;
    orderDate: string; // ISO string or similar
    totalAmount: number; // in cents
    status: OrderStatus;
}

export { OrderStatus };
export default Order;