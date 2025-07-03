import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params } : { params: Promise<{ id: string }> }) {
    const { id } = await params; 


    const duck = await prisma.duck.findUnique({ where: { id: Number(id) } });


    return NextResponse.json(duck);
}