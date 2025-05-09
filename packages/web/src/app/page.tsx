import Hero from "@/app/Hero.component";
import Footer from "@/app/Footer.component";
import NewestProducts from "./NewestProducts.component";

export default function Home() {
    return (
        <div>
            <Hero />
            <NewestProducts />
            <Footer />
        </div>
    );
}
