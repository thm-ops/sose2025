"use server";

import { RubberDuck } from "@/lib/model/rubberduck/prisma/Rubberduck.type";
import prisma from "@/lib/prisma";

export default async function getDuck(duckId: number): Promise<RubberDuck> {
    return await prisma.duck
        .findUnique({
            where: { id: duckId },
            include: {
                brand: true,
                origin: true,
                producer: true,
            },
        })
        .then((duck) => {
            if (!duck) {
                throw new Error("Duck not found");
            }
            return duck;
        });
}
