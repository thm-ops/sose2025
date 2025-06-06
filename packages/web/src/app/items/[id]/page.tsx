import { rubberDuckData } from "@/data/data";
import { RubberDuckSchema } from "@/lib/model/rubberduck/Rubberduck.type";
import { notFound } from "next/navigation";
import Header from "@/app/Header.component"; // Assumption: Header.component.tsx exists in src/app/
import ProductImage from "./ProductImage.component";
import ProductInfo from "./ProductInfo.component";
import ProductDetails from "./ProductDetails.component";
import AddToCartForm from "./AddToCartForm.component";

export default async function ItemsPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const duckId = parseInt(id, 10);
    const rawDuck = rubberDuckData.find((duck) => duck.id === duckId);

    if (!rawDuck) {
        notFound();
    }

    const duck = RubberDuckSchema.parse(rawDuck);

    return (
        <div className="min-h-screen bg-white">
            <Header />
            <main className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                <div className="lg:grid lg:grid-cols-2 lg:items-center lg:gap-x-8">
                    <ProductImage duck={duck} />
                    <div>
                        {" "}
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
