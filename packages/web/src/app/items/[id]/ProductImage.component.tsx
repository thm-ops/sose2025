import { RubberDuck } from "@/lib/model/rubberduck/prisma/Rubberduck.type";
import Image from "next/image";

interface ProductImageProps {
    readonly duck: RubberDuck;
}

export default function ProductImage({ duck }: ProductImageProps) {
    return (
        <div className="w-full overflow-hidden rounded-lg sm:rounded-lg">
            <Image
                src={`https://picsum.photos/seed/${duck.id}/800/800`}
                alt={`Image of ${duck.name}`}
                width={800}
                height={800}
                className="aspect-square w-full object-cover"
                priority
            />
        </div>
    );
}
