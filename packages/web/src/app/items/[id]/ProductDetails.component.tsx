import { RubberDuck } from "@/lib/model/rubberduck/prisma/Rubberduck.type";

interface ProductDetailsProps {
    readonly duck: RubberDuck;
}

export default function ProductDetails({ duck }: ProductDetailsProps) {
    return (
        <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-gray-700 px-4 sm:px-0">
            {" "}
            <div>
                <strong>Color:</strong> {duck.color}
            </div>
            <div>
                <strong>Size:</strong> {duck.size.toUpperCase()}
            </div>
            <div>
                <strong>Material:</strong> {duck.material}
            </div>
            <div>
                <strong>Brand:</strong> {duck.brand?.name ?? "–"}
            </div>
            <div>
                <strong>Origin:</strong> {duck.origin.name}
            </div>
            <div>
                <strong>Producer:</strong> {duck.producer.name}
            </div>
            <div>
                <strong>Weight:</strong> {duck.weight} kg
            </div>
        </div>
    );
}
