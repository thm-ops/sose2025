import { Order } from "../utils/types";
import { getStatusStyles } from "../utils/getStatusStyles";
import { classNames } from "../utils/classNames";

interface StatusBadgeProps {
    status: Order["status"];
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => (
    <span
        className={classNames(
            getStatusStyles(status),
            "inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset",
        )}>
        {status}
    </span>
);

export default StatusBadge;
