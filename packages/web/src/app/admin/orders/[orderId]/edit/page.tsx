import React from "react";
import Link from "next/link";
import AdminHeader from "@/app/admin/AdminHeader.component"; // Assuming this path is correct
import PageSection from "../../components/PageSection"; // Assuming PageSection is in a components folder

interface EditOrderPageProps {
    params: Promise<{ orderId: string }>;
}

export default async function EditOrderPage({ params }: EditOrderPageProps) {
    const { orderId } = await params;

    return (
        <div>
            <AdminHeader />
            <div className="h-full bg-gray-100 pt-[64px]">
                {" "}
                {/* Changed bg-gray-50 to bg-gray-100 for a slightly lighter feel */}
                <main className="py-10">
                    <div className="px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
                        {" "}
                        {/* Added max-w-3xl mx-auto to center and limit width */}
                        <PageSection>
                            <h1 className="text-3xl font-extrabold text-gray-900 mb-6">
                                Edit Order <span className="text-indigo-600">#{orderId}</span>
                            </h1>{" "}
                            {/* Larger, bolder title, with ID highlighted */}
                            <p className="text-gray-600 mb-8">
                                Adjust the details for order <span className="font-medium text-gray-800">#{orderId}</span> below.
                            </p>
                            <div className="space-y-6">
                                {" "}
                                {/* Increased spacing between form elements */}
                                <div>
                                    <label htmlFor="orderStatus" className="block text-sm font-semibold text-gray-700 mb-2">
                                        {" "}
                                        {/* Added font-semibold and mb-2 */}
                                        Change Order Status:
                                    </label>
                                    <div className="relative">
                                        <select
                                            id="orderStatus"
                                            name="orderStatus"
                                            className="block w-full pl-4 pr-10 py-2.5 text-base border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 appearance-none bg-white transition duration-150 ease-in-out" // Enhanced styling for select
                                            defaultValue="pending" // Or current order status
                                        >
                                            <option value="pending">Pending</option>
                                            <option value="processing">Processing</option>
                                            <option value="shipped">Shipped</option>
                                            <option value="completed">Completed</option>
                                            <option value="cancelled">Cancelled</option>
                                        </select>
                                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                            {/* Custom arrow for select dropdown */}
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
                                <div className="flex justify-end gap-x-3 pt-4">
                                    {" "}
                                    {/* Adjusted gap and padding top */}
                                    <Link
                                        href={`/admin/orders/${orderId}`}
                                        className="inline-flex items-center rounded-md border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150">
                                        {" "}
                                        {/* More robust button styling */}
                                        Cancel
                                    </Link>
                                    <button
                                        type="button"
                                        className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150" // More robust button styling
                                        onClick={() => alert(`Order ${orderId} status updated!`)}>
                                        Save Changes
                                    </button>
                                </div>
                            </div>
                            <div className="mt-8 pt-6 border-t border-gray-200">
                                {" "}
                                {/* Added top border for separation */}
                                <Link
                                    href={`/admin/orders/${orderId}`}
                                    className="text-indigo-600 hover:text-indigo-800 text-base font-medium transition duration-150 ease-in-out">
                                    {" "}
                                    {/* Enhanced link styling */}← Back to Order Details
                                </Link>
                            </div>
                        </PageSection>
                    </div>
                </main>
            </div>
        </div>
    );
}
