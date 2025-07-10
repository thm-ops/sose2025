import { z } from "zod";

export const ProductSchema = z.object({
    price: z.number().int().min(1),
    description: z.string().min(1),
    name: z.string().min(1),
    id: z.string().optional(),
    // eslint-disable-next-line camelcase
    create_time: z.string().optional(),
});

// extract the inferred type like this
type Product = z.infer<typeof ProductSchema>;

export default Product;
