import { SortConfig, SortableOrderKeys } from "../utils/types";
import SortableTableHeader from "./SortableTableHeader";

interface TableHeaderProps {
    onSort: (key: SortableOrderKeys) => void;
    sortConfig: SortConfig;
}

const TableHeader: React.FC<TableHeaderProps> = ({ onSort, sortConfig }) => {
    const headers: { name: string; key: SortableOrderKeys; className?: string }[] = [
        { name: "Order Number", key: "orderId", className: "py-3.5 pl-4 pr-3 sm:pl-6" },
        { name: "Customer Name", key: "customerName", className: "px-3 py-3.5" },
        { name: "Order Date", key: "orderDate", className: "px-3 py-3.5" },
        { name: "Total Amount", key: "totalAmount", className: "px-3 py-3.5" },
    ];

    return (
        <thead className="bg-gray-50">
            <tr>
                {headers.map((header) => (
                    <SortableTableHeader
                        key={header.key}
                        name={header.name}
                        sortKey={header.key}
                        className={header.className}
                        onSort={onSort}
                        sortConfig={sortConfig}
                    />
                ))}
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Status
                </th>
                <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                    <span className="sr-only">Actions</span>
                </th>
            </tr>
        </thead>
    );
};

export default TableHeader;
