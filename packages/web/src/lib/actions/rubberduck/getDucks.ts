"use server";

import { RubberDuck } from "@/lib/model/rubberduck/prisma/Rubberduck.type";
import prisma from "@/lib/prisma";

export default async function getDucks(): Promise<RubberDuck[]> {
    return await prisma.duck.findMany({
        include: {
            brand: true,
            producer: true,
            origin: true,
        },
    });
}
