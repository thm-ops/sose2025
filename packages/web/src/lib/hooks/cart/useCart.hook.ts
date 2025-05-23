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
        const storeValue = JSON.parse(storeValueString);
        console.log("value", typeof storeValue, storeValue);
        const store = CartSchema.parse(storeValue);
        console.log("store", store);
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
export default function useCart(storeName: string = "shopping-cart-store", postChannel: string = "shopping-cart-updated"): [cart: Cart, (cart: Cart) => void] {
    const [cart, setCart] = useState<Cart>([]);

    // function to treat new cart value
    function setCartWrapper(cart: Cart) {
        window.localStorage.setItem(storeName, JSON.stringify(cart))
        window.postMessage(postChannel);
    }

    // Initial load because window object isn't alsways present
    useEffect(() => {
        if (window) setCart(loadCartFromStore(storeName))
    }, [])

    //On change indicated by message or store event
    useEffect(() => {
        function messageListener(evnt: MessageEvent<string>) {
            if (evnt.data === postChannel) setCart(loadCartFromStore(storeName));
        }

        function storageListener() {
            setCart(loadCartFromStore(storeName));
        }

        window.addEventListener("message", messageListener);
        window.addEventListener("storage", storageListener)

        return () => {
            window.removeEventListener("message", messageListener);
            window.removeEventListener("storage", storageListener);
        }
    }, []);

    return [cart, setCartWrapper];
}