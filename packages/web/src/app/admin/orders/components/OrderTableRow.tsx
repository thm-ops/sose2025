import { Order } from "../utils/types";
import TableCell from "./TableCell";
import StatusBadge from "./StatusBadge";
import ActionLink from "./ActionLink";
import { formatDate } from "../utils/formatters";
import { Price } from "@/lib/utils/price";

interface OrderTableRowProps {
    order: Order;
}

const OrderTableRow: React.FC<OrderTableRowProps> = ({ order }) => (
    <tr>
        <TableCell isPrimary>{order.orderId}</TableCell>
        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{order.customerName}</td>
        <TableCell className="px-3">{formatDate(order.orderDate.toISOString())}</TableCell>
        <TableCell className="px-3">{Price.display(order.totalAmount)}</TableCell>
        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
            <StatusBadge status={order.status} />
        </td>
        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
            <ActionLink href={`/admin/orders/${order.orderId}`} srText={`, ${order.orderId}`}>
                Anzeigen
            </ActionLink>
        </td>
    </tr>
);

export default OrderTableRow;
