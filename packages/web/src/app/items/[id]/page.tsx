import { notFound } from "next/navigation";
import Header from "@/app/Header.component";
import ProductImage from "./ProductImage.component";
import ProductInfo from "./ProductInfo.component";
import ProductDetails from "./ProductDetails.component";
import AddToCartForm from "./AddToCartForm.component";
import QuickBuy from "./QuickBuy.component"; // Import der neuen Komponente
import getDuck from "@/lib/actions/rubberduck/getDuckById";

type ItemsPageProps = Readonly<{ params: { id: string } }>;

export default async function ItemsPage({ params }: ItemsPageProps) {
    const duck = await getDuck(parseInt(params.id)).catch(notFound);

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
                        <AddToCartForm />
                        <QuickBuy duck={duck} />
                    </div>
                </div>
            </main>
        </div>
    );
}
