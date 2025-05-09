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
                    <Link href="#" className="hidden text-sm font-semibold text-indigo-600 hover:text-indigo-500 sm:block">
                        Alle Produkte
                        <span aria-hidden="true"> &rarr;</span>
                    </Link>
                </div>

                <div className="relative mt-8">
                    <div className="relative -mb-6 w-full overflow-x-auto pb-6">
                        <ul
                            role="list"
                            className="mx-4 inline-flex space-x-8 sm:mx-6 lg:mx-0 lg:grid lg:grid-cols-4 lg:gap-x-8 lg:space-x-0">
                            {products.slice(0, 4).map((product) => (
                                <li key={product.id} className="inline-flex w-64 flex-col text-center lg:w-auto">
                                    <div className="group relative">
                                        <Image
                                            src={`https://picsum.photos/800/450?random=${product.id}`}
                                            height={450}
                                            width={800}
                                            alt={product.name}
                                            className="aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75"
                                        />
                                        <div className="mt-6">
                                            <p className="text-sm text-gray-500">{product.producer}</p>
                                            <h3 className="mt-1 font-semibold text-gray-900">
                                                <Link href="#">
                                                    {" "}
                                                    {/* <Link href={`/products/${product.id}`}> */}
                                                    <span className="absolute inset-0" />
                                                    {product.name}
                                                </Link>
                                            </h3>
                                            <p className="mt-1 text-gray-900">{product.price} €</p>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="mt-12 flex px-4 sm:hidden">
                    <Link href="#" className="text-sm font-semibold text-indigo-600 hover:text-indigo-500">
                        Alle Produkte
                        <span aria-hidden="true"> &rarr;</span>
                    </Link>
                </div>
            </div>
        </div>
    );
}
