import { StatItem } from "../utils/types";
import StatCard from "./StatCard";

interface StatsGridProps {
    stats: StatItem[];
}

const StatsGrid: React.FC<StatsGridProps> = ({ stats }) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
            <StatCard key={stat.name} stat={stat} isFirst={index === 0} />
        ))}
    </div>
);

export default StatsGrid;
