import { z } from "zod";

export const CartItemSchema = z.object({
    id: z.number().int().min(1),
    qty: z.number().int().min(1),
});

// extract the inferred type like this
type CartItem = z.infer<typeof CartItemSchema>;

export default CartItem;
