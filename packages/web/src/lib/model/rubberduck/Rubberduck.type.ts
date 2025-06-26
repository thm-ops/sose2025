import { z } from "zod";

// all properties are required by default
export const RubberDuckSchema = z.object({
    id: z.number().int().min(1),
    name: z.string().min(3),
    price: z.number().int().min(1),
    color: z.enum(["red", "yellow", "green", "blue"]),
    material: z.string(),
    size: z.enum(["s", "m", "l", "xl", "xxl"]),
    brand: z.string().min(3).optional(),
    origin: z.string().min(3),
    producer: z.string().min(3),
    weight: z.number(),
    description: z.string().min(3),
    image: z.string().min(1),
});

// extract the inferred type like this
type RubberDuck = z.infer<typeof RubberDuckSchema>;

export default RubberDuck;
