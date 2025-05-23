import Cart, { CartSchema } from "@/lib/model/cart/Cart.model";
import { useEffect, useState } from "react";

/**
 * Reset store with name of storeName
 * @param storeName
 */
function resetStore(storeName: string) {
    window.localStorage.setItem(storeName, "[]");
}

/**
 * Get data from given store storeName
 * @param storeName
 * @returns
 */
function loadCartFromStore(storeName: string) {
    try {
        const storeValueString = window.localStorage.getItem(storeName) || "[]";
        const storeValue: unknown = JSON.parse(storeValueString);
        const store = CartSchema.parse(storeValue);
        return store;
    } catch (e) {
        console.warn(e);
        resetStore(storeName);
    }
    return [];
}

/**
 * Cart Hook
 * @param storeName
 * @param postChannel
 * @returns
 */
export default function useCart(
    storeName: string = "shopping-cart-store",
    postChannel: string = "shopping-cart-updated",
): [cart: Cart, (cart: Cart) => void] {
    const [cart, setCart] = useState<Cart>([]);

    // function to treat new cart value
    function setCartWrapper(cart: Cart) {
        try {
            CartSchema.parse(cart);
            window.localStorage.setItem(storeName, JSON.stringify(cart));
            window.postMessage(postChannel);
        } catch(e) {
            console.warn(e);
        }
    }
    
    //On change indicated by message or store event
    useEffect(() => {
        if (window) setCart(loadCartFromStore(storeName));
        function messageListener(event: MessageEvent<string>) {
            if (event.data === postChannel) setCart(loadCartFromStore(storeName));
        }

        function storageListener() {
            setCart(loadCartFromStore(storeName));
        }

        window.addEventListener("message", messageListener);
        window.addEventListener("storage", storageListener);

        return () => {
            window.removeEventListener("message", messageListener);
            window.removeEventListener("storage", storageListener);
        };
    }, []);

    return [cart, setCartWrapper];
}
