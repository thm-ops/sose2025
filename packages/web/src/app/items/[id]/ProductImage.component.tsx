import Image from "next/image";
import RubberDuck from "@/lib/model/rubberduck/Rubberduck.type";

interface ProductImageProps {
    duck: RubberDuck;
}

export default function ProductImage({ duck }: ProductImageProps) {
    return (
        <div className="w-full overflow-hidden rounded-lg sm:rounded-lg">
            <Image
                src={`/media/products/${duck.id}`}
                alt={`Image of ${duck.name}`}
                width={800}
                height={800}
                className="aspect-square w-full object-cover"
                priority
            />
        </div>
    );
}
