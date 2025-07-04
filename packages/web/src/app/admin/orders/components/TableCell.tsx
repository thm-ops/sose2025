import { classNames } from "../utils/classNames";

interface TableCellProps {
    children: React.ReactNode;
    isPrimary?: boolean;
    className?: string;
}

const TableCell: React.FC<TableCellProps> = ({ children, isPrimary = false, className = "" }) => (
    <td
        className={classNames(
            isPrimary ? "font-medium text-gray-900" : "text-gray-500",
            "whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6",
            className,
        )}>
        {children}
    </td>
);

export default TableCell;
