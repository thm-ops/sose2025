import { StatItem } from "../utils/types";
import { classNames } from "../utils/classNames";

interface StatCardProps {
    stat: StatItem;
    isFirst?: boolean;
}

const StatCard: React.FC<StatCardProps> = ({ stat, isFirst = false }) => (
    <div className={classNames(
        !isFirst ? 'border-t sm:border-t-0 sm:border-l' : '',
        'border-gray-200 py-6 px-4 sm:px-6 lg:px-8'
    )}>
        <p className="text-sm font-medium leading-6 text-gray-600">{stat.name}</p>
        <p className="mt-2 flex items-baseline gap-x-2">
            <span className="text-4xl font-semibold tracking-tight text-gray-900">{stat.value}</span>
        </p>
    </div>
);

export default StatCard;
