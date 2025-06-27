import { Order, SortConfig, SortableOrderKeys } from "../utils/types";
import TableHeader from "./TableHeader";
import OrderTableRow from "./OrderTableRow";

interface OrdersTableProps {
    orders: Order[];
    onSort: (key: SortableOrderKeys) => void;
    sortConfig: SortConfig;
}

const OrdersTable: React.FC<OrdersTableProps> = ({ orders, onSort, sortConfig }) => (
    <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-300">
                        <TableHeader onSort={onSort} sortConfig={sortConfig} />
                        <tbody className="divide-y divide-gray-200 bg-white">
                            {orders.map((order) => (
                                <OrderTableRow key={order.orderId} order={order} />
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
);

export default OrdersTable;
