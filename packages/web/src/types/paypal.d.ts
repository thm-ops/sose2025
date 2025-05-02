/*
* This file is needed to extend the global window object with the PayPal SDK types.
* This is necessary because the linter does not know that the PayPal SDK is loaded dynamically
*/

interface PayPalHostedButtonsInstance {
    render(selector: string): void;
}

interface PayPalSDK {
    HostedButtons?: (options: { hostedButtonId: string }) => PayPalHostedButtonsInstance;
    // Other PayPal SDK methods can be added here as needed
}

declare global {
    interface Window {
        paypal?: PayPalSDK; // add paypal to the window object
    }
}

// This empty export statement is sometimes needed for the file to be recognized as a module
// and the global extension to be applied correctly.
export {};
