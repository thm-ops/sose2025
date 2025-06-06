import RubberDuck from "@/lib/model/rubberduck/Rubberduck.type";
import { Utils } from "@/lib/utils/mod";

interface ProductInfoProps {
    duck: RubberDuck;
}

export default function ProductInfo({ duck }: ProductInfoProps) {
    return (
        <div className="px-4 sm:px-0">
            {" "}
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">{duck.name}</h1>
            <div className="mt-3">
                <p className="text-3xl tracking-tight text-gray-900">{Utils.price.display(duck.price)}</p>
            </div>
            <div className="mt-6 space-y-6 text-base text-gray-700">
                <p>{duck.description}</p>
            </div>
        </div>
    );
}
