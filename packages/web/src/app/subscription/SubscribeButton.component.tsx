"use client";

import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import { getPlanId, onApproveSubscriptionAction } from "@/app/subscription/Subscription.actions";
import SubscriptionType from "@/lib/model/subscription/Subscription.type";

interface SubscribeButtonProps {
    subscription: SubscriptionType;
}

/**
 * Renders a PayPal "Subscribe" button that initiates a subscription flow via the v1 REST API.
 *
 * @returns {JSX.Element} The rendered "Subscribe" component.
 */
export default function SubscribeButton({ subscription }: SubscribeButtonProps) {
    return (
        <div className="mt-4 px-4 sm:px-0">
            <PayPalScriptProvider
                options={{
                    clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID!,
                    vault: true,
                    intent: "subscription",
                }}>
                <PayPalButtons
                    style={{ layout: "horizontal", label: "subscribe" }}
                    createSubscription={async (data, actions) => {
                        const planId = await getPlanId(subscription);
                        if (planId == null) {
                            throw new Error("Unable to get PlanId");
                        }
                        return actions.subscription
                            .create({
                                // eslint-disable-next-line camelcase
                                plan_id: planId,
                            })
                            .then((orderId) => {
                                return orderId;
                            });
                    }}
                    onApprove={async () => {
                        const approve = await onApproveSubscriptionAction();
                        if (approve == "success") {
                            window.location.href = "/";
                        } else {
                            console.error("Unable to approve subscription action");
                        }
                    }}
                    onError={(err) => {
                        console.error("PayPal Subscription Error:", err);
                    }}
                />
            </PayPalScriptProvider>
        </div>
    );
}
