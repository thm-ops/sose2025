import { NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/lib/prisma"; // Adjust path to your Prisma Client
import { RubberDuckSchema } from "@/lib/model/rubberduck/Rubberduck.type"; // Adjust path to your schema

// GET /api/ducks
export async function GET() {
    try {
        // Fetch ducks with related data
        const ducks = await prisma.duck.findMany({
            include: {
                brand: true,
                origin: true,
                producer: true,
            },
        });

        // Map data from Prisma to fit RubberDuckSchema
        const formatted = ducks.map((duck) => ({
            id: duck.id,
            name: duck.name,
            price: duck.price,
            color: duck.color, // Prisma enum as string → Zod enum accepts string
            material: duck.material,
            size: duck.size, // Prisma enum as string → Zod enum accepts string
            brand: duck.brand?.name ?? null, // optional()
            origin: duck.origin.name,
            producer: duck.producer.name,
            weight: duck.weight,
            description: duck.description,
        }));

        // Validate array of ducks with Zod
        const DucksArraySchema = z.array(RubberDuckSchema);
        const result = DucksArraySchema.parse(formatted);

        return NextResponse.json(result);
    } catch (error) {
        console.error("Error fetching ducks:", error);
        return NextResponse.json({ error: "Failed to fetch ducks" }, { status: 500 });
    }
}
