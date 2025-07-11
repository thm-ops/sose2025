import { Prisma } from "@/generated/prisma";

export type RubberDuck = Prisma.DuckGetPayload<{
    include: {
        brand: true;
        origin: true;
        producer: true;
    };
}>;
