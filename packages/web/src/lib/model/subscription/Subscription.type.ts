import { z } from "zod";
import { ProductSchema } from "@/lib/model/product/Product.type";

export const SubscriptionSchema = ProductSchema.extend({
    amount: z.number().int().min(1),
});

// extract the inferred type like this
type Subscription = z.infer<typeof SubscriptionSchema>;

export default Subscription;
