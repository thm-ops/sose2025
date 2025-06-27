"use client";
import React, { FunctionComponent } from "react";

type Props = {
    cashflowDays: number;
    setCashflowDays: (days: number) => void;
};

/**
 * @constant timePeriods
 * @type {Array<{ label: string; value: number }>}
 * @description Contains the predefined time periods for cash flow data selection.
 */
const timePeriods: { label: string; value: number }[] = [
    { label: "Letzte 7 Tage", value: 7 },
    { label: "Letzte 30 Tage", value: 30 },
    { label: "Gesamter Zeitraum", value: 0 },
];

/**
 * @component AdminTimeSelect
 * @description A header component for selecting the time period for cash flow data.
 * @param cashflowDays - The currently selected number of days for cash flow.
 * @param setCashflowDays - Function to update the selected number of days.
 */
const AdminTimeSelect: FunctionComponent<Props> = ({ cashflowDays, setCashflowDays }) => {
    return (
        <header className="pt-6 pb-4 sm:pb-6">
            <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-6 px-4 sm:flex-nowrap sm:px-6 lg:px-8">
                <h1 className="text-base/7 font-semibold text-gray-900">Umsatz</h1>
                <div className="order-last flex w-full gap-x-8 text-sm/6 font-semibold sm:order-0 sm:w-auto sm:border-l sm:border-gray-200 sm:pl-6 sm:text-sm/7">
                    {timePeriods.map((period) => (
                        <a
                            key={period.value}
                            onClick={() => setCashflowDays(period.value)}
                            className={`${cashflowDays === period.value ? "text-indigo-600" : "text-gray-700"} cursor-pointer hover:text-indigo-600 hover:scale-105 transition-transform`}>
                            {period.label}
                        </a>
                    ))}
                </div>
            </div>
        </header>
    );
};

export default AdminTimeSelect;
