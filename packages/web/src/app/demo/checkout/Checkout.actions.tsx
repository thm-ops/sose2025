"use server";

import Cart from "@/lib/model/cart/Cart.model";
import { PayPalApiService } from "@/lib/paypal";

export async function placeOrder(cart: Cart): Promise<string> {
    const order = await new PayPalApiService().createOrder(cart);
    return order.id!;
}

export async function captureOrder(id: string): Promise<boolean> {
    const capture = await new PayPalApiService().captureOrder(id);
    return capture.status! in ["COMPLETED", "APPROVED"];
}
