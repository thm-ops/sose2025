"use server";

import { PayPalApiService } from "@/lib/paypal";
import SubscriptionType from "@/lib/model/subscription/Subscription.type";

/**
 * Calls getPlanId in PayPalApiService to get a PlanId
 * @param subscription the subscription which is sold to the use
 * @returns {Promise<string | null>} A promise that resolves to the planId or null if no planId could be provided
 */
export async function getPlanId(subscription: SubscriptionType) {
    try {
        const paypalService = new PayPalApiService();
        return await paypalService.getPlanId(subscription);
    } catch (error) {
        console.error("GetPlanId error:", error);
        return null;
    }
}

/**
 * Example function to demonstrate onApprove action.
 * Could for example be used to update the database.
 * @returns {Promise<string>} A promise that resolves to success
 */
export async function onApproveSubscriptionAction() {
    return new Promise<string>((resolve) => {
        console.log("onApproveSubscriptionAction called");
        resolve("success");
    });
}
