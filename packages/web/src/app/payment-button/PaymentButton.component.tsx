"use client"
import React, {FunctionComponent, useEffect} from 'react';

const PaymentButton: FunctionComponent = () => {
    useEffect(() => {
        // Load PayPal SDK only once
        const script = document.createElement("script");
        script.src = "https://www.paypal.com/sdk/js?client-id=BAAMqNFDABwk6Iyw_ngSWhxAIdMvWfX7-lTYYAMTMkdq5VZHllslgXaCthmFmc5gMLBp74L3B9o8DUYrX8&components=hosted-buttons&disable-funding=venmo&currency=EUR";
        script.crossOrigin = "anonymous";
        script.async = true;

        script.onload = () => {
            if (window.paypal?.HostedButtons) {
                window.paypal.HostedButtons({
                    hostedButtonId: "EGGDXES2VWUWY"
                }).render("#paypal-container-EGGDXES2VWUWY");
            }
        };

        document.body.appendChild(script);
    }, []);

    return <div id="paypal-container-EGGDXES2VWUWY"></div>
};

export default PaymentButton;
