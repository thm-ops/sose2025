import React from "react"; // Import React for JSX

// Define a type for Order
interface Order {
    orderId: string;
    customerName: string;
    orderDate: string; // Storing as string for simplicity, could be Date object
    totalAmount: number; // In cents
    status: "Pending" | "Shipped" | "Delivered" | "Cancelled";
}

const OrderManagementPage = () => {
    const ordersData: Order[] = [
        {
            orderId: "ORD001",
            customerName: "Alice Smith",
            orderDate: "2025-06-15",
            totalAmount: 15999,
            status: "Shipped",
        },
        {
            orderId: "ORD002",
            customerName: "Bob Johnson",
            orderDate: "2025-06-14",
            totalAmount: 7550,
            status: "Pending",
        },
        {
            orderId: "ORD003",
            customerName: "Charlie Brown",
            orderDate: "2025-06-12",
            totalAmount: 22000,
            status: "Delivered",
        },
        {
            orderId: "ORD004",
            customerName: "Diana Prince",
            orderDate: "2025-06-10",
            totalAmount: 4999,
            status: "Cancelled",
        },
        {
            orderId: "ORD005",
            customerName: "Clark Kent",
            orderDate: "2025-06-16",
            totalAmount: 12500,
            status: "Pending",
        },
        {
            orderId: "ORD006",
            customerName: "Bruce Wayne",
            orderDate: "2025-06-13",
            totalAmount: 30000,
            status: "Shipped",
        },
    ];

    // SVG Icon Component for Sort Indicator
    const SortIndicatorIcon = () => (
        <span className="ml-1.5 opacity-60">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="inline-block">
                <path d="m18 15-6-6-6 6" />
            </svg>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="inline-block -mt-2">
                <path d="m6 9 6 6 6-6" />
            </svg>
        </span>
    );

    // Helper to format price from cents to a currency string
    const formatPrice = (priceInCents: number) => {
        return (priceInCents / 100).toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
        });
    };

    // Helper to format date
    const formatDate = (dateString: string) => {
        const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "short", day: "numeric" };
        return new Date(dateString).toLocaleDateString("en-US", options);
    };

    // Helper to get status tag styles
    const getStatusStyles = (status: Order["status"]) => {
        switch (status) {
            case "Pending":
                return "bg-yellow-100 text-yellow-800";
            case "Shipped":
                return "bg-blue-100 text-blue-800";
            case "Delivered":
                return "bg-green-100 text-green-800";
            case "Cancelled":
                return "bg-red-100 text-red-800";
            default:
                return "bg-gray-100 text-gray-800";
        }
    };

    return (
        <main className="flex-1 p-4 md:p-6 lg:p-8 bg-gray-50">
            <div className="max-w-7xl mx-auto">
                {/* Page Header */}
                <div className="mb-6">
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Order Management</h1>
                    <p className="text-sm text-gray-600 mt-1">View and manage all customer orders.</p>
                </div>

                {/* Orders Table Card */}
                <div className="bg-white shadow-md rounded-lg overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        <div className="flex items-center">
                                            Order ID
                                            <SortIndicatorIcon />
                                        </div>
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        <div className="flex items-center">
                                            Customer Name
                                            <SortIndicatorIcon />
                                        </div>
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        <div className="flex items-center">
                                            Order Date
                                            <SortIndicatorIcon />
                                        </div>
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        <div className="flex items-center">
                                            Total Amount
                                            <SortIndicatorIcon />
                                        </div>
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th scope="col" className="relative px-6 py-3">
                                        <span className="sr-only">Actions</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {ordersData.map((order) => (
                                    <tr key={order.orderId} className="hover:bg-gray-50 transition-colors duration-200">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500">{order.orderId}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                                            {order.customerName}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{formatDate(order.orderDate)}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                            {formatPrice(order.totalAmount)}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                                            <span
                                                className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusStyles(order.status)}`}>
                                                {order.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <a href="#" className="text-indigo-600 hover:text-indigo-900 mr-4">
                                                View
                                            </a>
                                            <a href="#" className="text-blue-600 hover:text-blue-900">
                                                Edit
                                            </a>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default OrderManagementPage;
