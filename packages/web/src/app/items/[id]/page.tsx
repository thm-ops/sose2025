import prisma from "@/lib/prisma";
import Header from "@/app/Header.component"; // Assumption: Header.component.tsx exists in src/app/
import ProductImage from "./ProductImage.component";
import ProductInfo from "./ProductInfo.component";
import ProductDetails from "./ProductDetails.component";
import AddToCartForm from "./AddToCartForm.component";
import { notFound } from "next/navigation";

export default async function ItemsPage({ params }: Readonly<{ params: Promise<{ id: string }> }>) {
    const { id } = await params;
    const duckId = parseInt(id, 10);
    const duck = await prisma.duck.findUnique({
        where: { id: duckId },
        include: {
            brand: true,
            origin: true,
            producer: true,
        },
    });

    if (!duck) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-white">
            <Header />
            <main className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                <div className="lg:grid lg:grid-cols-2 lg:items-center lg:gap-x-8">
                    <ProductImage duck={duck} />
                    <div>
                        {/* Retaining the layout container for product info and form */}
                        <ProductInfo duck={duck} />
                        <ProductDetails duck={duck} />
                        <AddToCartForm /> {/* May need duckId or other info as props */}
                    </div>
                </div>
            </main>
        </div>
    );
}
