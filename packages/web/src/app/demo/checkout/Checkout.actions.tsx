"use server";

import Cart from "@/lib/model/cart/Cart.model";
import { PayPalApiService } from "@/lib/paypal";

/**
 * Places an order using the provided cart by creating a new order via the PayPal API service.
 *
 * @param cart - The shopping cart containing items to be ordered.
 * @returns A promise that resolves to the unique identifier (ID) of the created order.
 */
export async function placeOrder(cart: Cart): Promise<string> {
    const order = await new PayPalApiService().createOrder(cart);
    return order.id!;
}

/**
 * Captures a PayPal order by its ID and returns whether the capture was successful.
 *
 * @param id - The unique identifier of the PayPal order to capture.
 * @returns A promise that resolves to `true` if the order status is "COMPLETED" or "APPROVED", otherwise `false`.
 */
export async function captureOrder(id: string): Promise<boolean> {
    const capture = await new PayPalApiService().captureOrder(id);
    return capture.status! in ["COMPLETED", "APPROVED"];
}
