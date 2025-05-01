"use client";

import { useEffect } from "react";

const PaymentButton = () => {
  useEffect(() => {
    // Load PayPal SDK only once
    const script = document.createElement("script");
    script.src = "https://www.paypal.com/sdk/js?client-id=BAAMqNFDABwk6Iyw_ngSWhxAIdMvWfX7-lTYYAMTMkdq5VZHllslgXaCthmFmc5gMLBp74L3B9o8DUYrX8&components=hosted-buttons&disable-funding=venmo&currency=EUR";
    script.crossOrigin = "anonymous";
    script.async = true;

    script.onload = () => {
      // @ts-expect-error - PayPal global not typed
      if (window.paypal?.HostedButtons) {
        // @ts-expect-error - PayPal global not typed
        window.paypal.HostedButtons({
          hostedButtonId: "EGGDXES2VWUWY"
        }).render("#paypal-container-EGGDXES2VWUWY");
      }
    };

    document.body.appendChild(script);
  }, []);

  return (
    <div>
      <div id="paypal-container-EGGDXES2VWUWY"></div>
    </div>
  );
};

export default PaymentButton;
