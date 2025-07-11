import Footer from "@/app/Footer.component";
import Header from "@/app/Header.component";
import ProductInfo from "@/app/subscription/ProductInfo.component";
import RubberDuck from "@/lib/model/rubberduck/Rubberduck.type";
import SubscribeButton from "@/app/subscription/SubscribeButton.component";
import SubscriptionType from "@/lib/model/subscription/Subscription.type";
import ProductImage from "@/app/items/[id]/ProductImage.component";

const MysteryDuck: RubberDuck = {
    color: "mystery",
    description: "A mystery duck every Month",
    id: 99999,
    material: "",
    name: "Mystery Duck",
    origin: "",
    price: 1499,
    producer: "",
    size: "mystery",
    weight: 1,
};

const MysteryDuckSubscription: SubscriptionType = {
    price: MysteryDuck.price / 100,
    name: MysteryDuck.name,
    description: MysteryDuck.description,
    amount: 1,
};

export default function Home() {
    return (
        <div className="min-h-screen bg-white">
            <Header />
            <main className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                <div className="lg:grid lg:grid-cols-2 lg:items-center lg:gap-x-8">
                    <ProductImage duck={MysteryDuck} />
                    <div>
                        <ProductInfo duck={MysteryDuck} />
                        <SubscribeButton subscription={MysteryDuckSubscription} />
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
