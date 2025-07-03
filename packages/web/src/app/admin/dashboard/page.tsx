"use client";

import { useState } from "react";
import AdminHeader from "@/app/admin/AdminHeader.component";
import AdminTimeSelect from "@/app/admin/dashboard/AdminTimespanSelect.component";
import AdminStats from "@/app/admin/dashboard/AdminStats.component";
import AdminRecentOrders from "@/app/admin/dashboard/AdminRecentOrders.component";
import AdminRecentCustomers from "@/app/admin/dashboard/AdminRecentCustomers.component";

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
                    <AdminRecentOrders />
                    <AdminRecentCustomers />
                </div>
            </main>
        </div>
    );
}
