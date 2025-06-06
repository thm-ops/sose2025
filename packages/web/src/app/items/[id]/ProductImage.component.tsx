import Image from "next/image";
import RubberDuck from "@/lib/model/rubberduck/Rubberduck.type";
interface ProductImageProps {
    duck: RubberDuck;
}

export default function ProductImage({ duck }: ProductImageProps) {
    return (
        <div className="w-full overflow-hidden rounded-lg sm:rounded-lg">
            <Image
                src={`https://picsum.photos/800/800?random=${duck.id}`}
                alt={`Image of ${duck.name}`} // Alt text in English for consistency
                width={800}
                height={800}
                className="aspect-square w-full object-cover"
                priority // Important for LCP (Largest Contentful Paint)
            />
        </div>
    );
}
