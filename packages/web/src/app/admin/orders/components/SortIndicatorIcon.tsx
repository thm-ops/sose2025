import { classNames } from "../utils/classNames";

export enum SortDirection {
    Ascending = "ascending",
    Descending = "descending",
}

interface SortIndicatorIconProps {
    isSorted: boolean;
    direction: SortDirection;
}

const SortIndicatorIcon: React.FC<SortIndicatorIconProps> = ({ isSorted, direction }) => {
    const iconColor = isSorted ? "text-gray-800" : "text-gray-400 group-hover:text-gray-500";
    return (
        <span className={classNames("ml-2 flex-none rounded", iconColor)}>
            <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                {isSorted && direction === SortDirection.Ascending && (
                    <path d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" />
                )}
                {isSorted && direction === SortDirection.Descending && (
                    <path d="M14.78 11.78a.75.75 0 0 1-1.06 0L10 8.06l-3.72 3.72a.75.75 0 1 1-1.06-1.06l4.25-4.25a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06Z" />
                )}
            </svg>
        </span>
    );
};

export default SortIndicatorIcon;
