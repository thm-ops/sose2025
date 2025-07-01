"use client";

import React from "react";
import Link from "next/link";
import AdminHeader from "@/app/admin/AdminHeader.component";
import PageSection from "../../components/PageSection";
import { OrderStatus } from "@/lib/model/order/Order.type";

interface Props {
    orderId: string;
}

export default function EditOrderPage({ orderId }: Props) {
    return (
        <div>
            {/* Top admin navigation header */}
            <AdminHeader />

            <div className="h-full bg-gray-100 pt-[64px]">
                <main className="py-10">
                    <div className="px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
                        <PageSection>
                            {/* Page title and intro text */}
                            <h1 className="text-3xl font-extrabold text-gray-900 mb-6">
                                Edit Order <span className="text-indigo-600">#{orderId}</span>
                            </h1>
                            <p className="text-gray-600 mb-8">
                                Adjust the details for order <span className="font-medium text-gray-800">#{orderId}</span> below.
                            </p>

                            {/* Order status update form */}
                            <div className="space-y-6">
                                <div>
                                    <label htmlFor="orderStatus" className="block text-sm font-semibold text-gray-700 mb-2">
                                        Change Order Status:
                                    </label>
                                    <div className="relative">
                                        {/* Order status dropdown */}
                                        <select
                                            id="orderStatus"
                                            name="orderStatus"
                                            className="block w-full pl-4 pr-10 py-2.5 text-base border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 appearance-none bg-white transition duration-150 ease-in-out"
                                            defaultValue={OrderStatus.Pending}
                                        >
                                            <option value={OrderStatus.Pending}>Pending</option>
                                            <option value={OrderStatus.Shipped}>Shipped</option>
                                            <option value={OrderStatus.Delivered}>Delivered</option>
                                            <option value={OrderStatus.Cancelled}>Cancelled</option>
                                        </select>

                                        {/* Dropdown arrow icon */}
                                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                            <svg
                                                className="h-5 w-5"
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                                aria-hidden="true">
                                                <path
                                                    fillRule="evenodd"
                                                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        </div>
                                    </div>
                                </div>

                                {/* Action buttons: cancel and save */}
                                <div className="flex justify-end gap-x-3 pt-4">
                                    <Link
                                        href={`/admin/orders/${orderId}`}
                                        className="inline-flex items-center rounded-md border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150">
                                        Cancel
                                    </Link>
                                    <button
                                        type="button"
                                        className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150"
                                        onClick={() => alert(`Order ${orderId} status updated!`)}>
                                        Save Changes
                                    </button>
                                </div>
                            </div>

                            {/* Link to return to order details */}
                            <div className="mt-8 pt-6 border-t border-gray-200">
                                <Link
                                    href={`/admin/orders/${orderId}`}
                                    className="text-indigo-600 hover:text-indigo-800 text-base font-medium transition duration-150 ease-in-out">
                                    ← Back to Order Details
                                </Link>
                            </div>
                        </PageSection>
                    </div>
                </main>
            </div>
        </div>
    );
}
