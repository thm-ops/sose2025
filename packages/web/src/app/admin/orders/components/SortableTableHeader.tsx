import React from "react";
import { SortableOrderKeys, SortConfig } from "../utils/types";
import SortIndicatorIcon, { SortDirection } from "./SortIndicatorIcon";
import { classNames } from "../utils/classNames";

interface SortableTableHeaderProps {
    name: string;
    sortKey: SortableOrderKeys;
    className?: string;
    onSort: (key: SortableOrderKeys) => void;
    sortConfig: SortConfig;
}

const SortableTableHeader: React.FC<SortableTableHeaderProps> = ({ name, sortKey, className = "", onSort, sortConfig }) => (
    <th scope="col" className={classNames(className, "text-left text-sm font-semibold text-gray-900")}>
        <a
            href="#"
            onClick={(e) => {
                e.preventDefault();
                onSort(sortKey);
            }}
            className="group inline-flex">
            {name}
            <SortIndicatorIcon isSorted={sortConfig.key === sortKey} direction={SortDirection.Descending} />
        </a>
    </th>
);

export default SortableTableHeader;
