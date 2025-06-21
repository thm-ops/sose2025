"use client";

import { useState } from "react";
import AdminHeader from "@/app/admin/dashboard/AdminHeader.component";
import AdminTimeSelect from "@/app/admin/dashboard/AdminTimespanSelect.component";
import AdminStats from "@/app/admin/dashboard/AdminStats.component";
import AdminRecentOrders from "@/app/admin/dashboard/AdminRecentOrders.component";
import AdminRecentCustomers from "@/app/admin/dashboard/AdminRecentCustomers.component";

/**
 * @constant statuses
 * @type {Record<string, string>}
 * @description Maps order statuses to their corresponding Tailwind CSS classes for styling.
 */
const statuses: Record<string, string> = {
    Captured: "text-green-700 bg-green-50 ring-green-600/20",
    Bezahlt: "text-gray-600 bg-gray-50 ring-gray-500/10",
    Offen: "text-red-700 bg-red-50 ring-red-600/10",
};

/**
 * @component AdminDashboard
 * @description The main component for the admin dashboard, which includes the header, stats, recent orders, and recent customers.
 */
export default function AdminDashboard() {
    const [cashflowDays, setCashflowDays] = useState(7);

    return (
        <div>
            <AdminHeader />
            <main>
                <div className="relative isolate overflow-hidden pt-16">
                    <AdminTimeSelect cashflowDays={cashflowDays} setCashflowDays={setCashflowDays} />
                    <AdminStats cashflowDays={cashflowDays} />
                </div>
                <div className="space-y-16 py-16 xl:space-y-20">
                    <AdminRecentOrders statuses={statuses} />
                    <AdminRecentCustomers statuses={statuses} />
                </div>
            </main>
        </div>
    );
}
