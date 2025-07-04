import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
    const ducks = await prisma.duck.findMany({
        include: {
            brand: {
                select: {
                    name: true,
                },
            },
            origin: {
                select: {
                    name: true,
                },
            },
            producer: {
                select: {
                    name: true,
                },
            },
        },
    });

    return NextResponse.json(ducks);
}
