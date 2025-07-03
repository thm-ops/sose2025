"use client";
import React, { FunctionComponent } from "react";
import { classNames } from "@/app/admin/orders/utils/classNames";

type Props = {
    cashflowDays: number;
};

/**
 * @constant stats
 * @type {Array<{name: string, value: string, change: string, changeType: 'positive' | 'negative'}>}
 * @description Contains the key statistics displayed in the AdminStats component, including products, orders, customers, and revenue.
 */
const stats: Array<{ name: string; value: string; change: string; changeType: "positive" | "negative" }> = [
    { name: "Produkte", value: "69 Produkte", change: "+54.02%", changeType: "positive" },
    { name: "Bestellungen", value: "28 Bestellungen", change: "-20.02%", changeType: "negative" },
    { name: "Kunden", value: "20 Kunden", change: "+54.02%", changeType: "positive" },
    { name: "Umsatz", value: "245,98 €", change: "-1.39%", changeType: "negative" },
];

/**
 * @component AdminStats
 * @description Displays key statistics for the admin dashboard, including products, orders, customers, and revenue.
 * @param cashflowDays - The currently selected number of days for cash flow.
 */
const AdminStats: FunctionComponent<Props> = ({}) => {
    return (
        <div className="border-b border-b-gray-900/10 lg:border-t lg:border-t-gray-900/5">
            <dl className="mx-auto grid max-w-7xl grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 lg:px-2 xl:px-0">
                {stats.map((stat, statIdx) => (
                    <div
                        key={stat.name}
                        className={classNames(
                            statIdx % 2 === 1 ? "sm:border-l" : statIdx === 2 ? "lg:border-l" : "",
                            "flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2 border-t border-gray-900/5 px-4 py-10 sm:px-6 lg:border-t-0 xl:px-8",
                        )}>
                        <dt className="text-sm/6 font-medium text-gray-500">{stat.name}</dt>
                        <dd
                            className={classNames(
                                stat.changeType === "negative" ? "text-rose-600" : "text-gray-700",
                                "text-xs font-medium",
                            )}>
                            {stat.change}
                        </dd>
                        <dd className="w-full flex-none text-3xl/10 font-medium tracking-tight text-gray-900">{stat.value}</dd>
                    </div>
                ))}
            </dl>
            <AdminStatsEffects />
        </div>
    );
};

/**
 * @component AdminStatsEffects
 * @description A decorative component that adds visual effects to the AdminStats component.
 */
function AdminStatsEffects() {
    return (
        <div
            aria-hidden="true"
            className="absolute top-full left-0 -z-10 mt-96 origin-top-left translate-y-40 -rotate-90 transform-gpu opacity-20 blur-3xl sm:left-1/2 sm:-mt-10 sm:-ml-96 sm:translate-y-0 sm:rotate-0 sm:transform-gpu sm:opacity-50">
            <div
                style={{
                    clipPath:
                        "polygon(100% 38.5%, 82.6% 100%, 60.2% 37.7%, 52.4% 32.1%, 47.5% 41.8%, 45.2% 65.6%, 27.5% 23.4%, 0.1% 35.3%, 17.9% 0%, 27.7% 23.4%, 76.2% 2.5%, 74.2% 56%, 100% 38.5%)",
                }}
                className="aspect-1154/678 w-288.5 bg-linear-to-br from-[#FF80B5] to-[#9089FC]"
            />
        </div>
    );
}

export default AdminStats;
