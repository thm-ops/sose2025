import SimpleCart from "./SimpleCart.component";
import Timer from "./Timer.component";

export default function DemoPage() {
    return (
        <div>
            Hello Demo page!
            <div>
                <Timer />
            </div>
            <SimpleCart />
            <SimpleCart />
        </div>
    );
}
