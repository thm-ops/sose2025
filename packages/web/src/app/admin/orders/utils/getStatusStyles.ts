import { Order } from './types';

export const getStatusStyles = (status: Order["status"]): string => {
    switch (status) {
        case "Pending":
            return "bg-yellow-100 text-yellow-800 ring-yellow-600/20";
        case "Shipped":
            return "bg-blue-100 text-blue-800 ring-blue-600/20";
        case "Delivered":
            return "bg-green-100 text-green-800 ring-green-600/20";
        case "Cancelled":
            return "bg-red-100 text-red-800 ring-red-600/20";
        default:
            return "bg-gray-100 text-gray-800 ring-gray-600/20";
    }
};
