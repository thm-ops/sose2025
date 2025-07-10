import { z } from "zod";

export const PlanSchema = z.object({
    name: z.string().min(1),
    id: z.string().min(1),
    status: z.string().min(1),
});

// extract the inferred type like this
type Plan = z.infer<typeof PlanSchema>;

export default Plan;
