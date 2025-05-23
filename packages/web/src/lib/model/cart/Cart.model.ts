import { z } from "zod";
import { CartItemSchema } from "./CartItem.model";

export const CartSchema = z.array(CartItemSchema)

// extract the inferred type like this
type Cart = z.infer<typeof CartSchema>;

export default Cart;