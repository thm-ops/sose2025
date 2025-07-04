"use client";

import React, { useMemo, useState } from "react";
import { OrderStatus, SortableOrderKeys, SortConfig, SortDirection, StatItem } from "./utils/types";
import { ordersData } from "./orderData";
import { Price } from "@/lib/utils/price";

import LiveIndicator from "./components/LiveIndicator";
import PageHeader from "./components/PageHeader";
import PageSection from "./components/PageSection";
import StatsGrid from "./components/StatsGrid";
import OrdersTable from "./components/OrdersTable";
import AdminHeader from "@/app/admin/AdminHeader.component";

const OrderManagementPage = () => {
    const [sortConfig, setSortConfig] = useState<SortConfig>({
        key: "orderDate",
        direction: SortDirection.Descending,
    });

    const sortedOrders = useMemo(() => {
        const sortableItems = [...ordersData];
        if (sortConfig.key) {
            sortableItems.sort((a, b) => {
                if (a[sortConfig.key!] < b[sortConfig.key!]) {
                    return sortConfig.direction === SortDirection.Ascending ? -1 : 1;
                }
                if (a[sortConfig.key!] > b[sortConfig.key!]) {
                    return sortConfig.direction === SortDirection.Ascending ? 1 : -1;
                }
                return 0;
            });
        }
        return sortableItems;
    }, [sortConfig]);

    const handleSort = (key: SortableOrderKeys) => {
        let direction: SortDirection;
        if (sortConfig.key === key && sortConfig.direction === SortDirection.Ascending) {
            direction = SortDirection.Descending;
        } else {
            direction = SortDirection.Ascending;
        }
        setSortConfig({ key, direction });
    };

    const stats: StatItem[] = [
        { name: "Total Orders", value: ordersData.length.toString() },
        { name: "Pending Orders", value: ordersData.filter((o) => o.status === OrderStatus.Pending).length.toString() },
        { name: "Total Revenue", value: Price.display(ordersData.reduce((acc, o) => acc + o.totalAmount, 0)) },
        { name: "Success Rate", value: "99.8%" },
    ];

    return (
        <div>
            <AdminHeader />
            <div className="h-full bg-gray-50 pt-[64px]">
                <main className="py-10">
                    <div className="px-4 sm:px-6 lg:px-8">
                        <PageSection>
                            <PageHeader title="Order Management" description="An overview of all customer orders.">
                                <LiveIndicator />
                            </PageHeader>
                            <StatsGrid stats={stats} />
                        </PageSection>

                        <OrdersTable orders={sortedOrders} onSort={handleSort} sortConfig={sortConfig} />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default OrderManagementPage;
