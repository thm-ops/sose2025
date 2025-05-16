import Image from "next/image";
import Link from "next/link";
import { rubberDuckData } from "@/data/data";
import RubberDuck from "@/lib/model/rubberduck/Rubberduck.type";

const products: RubberDuck[] = rubberDuckData;

export default function NewestProducts() {
    return (
        <div className="bg-white">
            <div className="py-16 sm:py-24 lg:mx-auto lg:max-w-7xl lg:px-8">
                <div className="flex items-center justify-between px-4 sm:px-6 lg:px-0">
                    <h2 className="text-2xl font-bold tracking-tight text-gray-900">Neueste Produkte</h2>
                </div>

                <div className="relative mt-10 px-4 sm:px-6 lg:px-0">
                    <ul role="list" className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                        {products.map((product) => (
                            <li
                                key={product.id}
                                className="bg-gray-50 rounded-2xl shadow transition-transform duration-200 hover:scale-[1.02] hover:shadow-lg">
                                <Link href={`/items/${product.id}`}>
                                    <div className="group block">
                                        <Image
                                            src={`https://picsum.photos/800/450?random=${product.id}`}
                                            height={450}
                                            width={800}
                                            alt={product.name}
                                            className="w-full h-48 object-cover rounded-t-2xl"
                                        />
                                        <div className="p-4">
                                            <p className="text-sm text-gray-500">{product.producer}</p>
                                            <h3 className="mt-1 font-semibold text-gray-800 group-hover:underline">{product.name}</h3>
                                            <p className="mt-1 text-gray-900 font-medium">{product.price.toFixed(2)} €</p>
                                        </div>
                                    </div>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}
