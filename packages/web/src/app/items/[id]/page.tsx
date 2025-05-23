import { rubberDuckData } from "@/data/data";
import { RubberDuckSchema } from "@/lib/model/rubberduck/Rubberduck.type";
import { notFound } from "next/navigation";
import Image from "next/image";
import Header from "@/app/Header.component";

export default async function ItemsPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const duckId = parseInt(id, 10);
    const rawDuck = rubberDuckData.find((duck) => duck.id === duckId);
    if (!rawDuck) notFound();
    const duck = RubberDuckSchema.parse(rawDuck);

    return (
        <div className="min-h-screen bg-white">
            <Header />
            <main className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                {/* Grid mit vertikaler Zentrierung */}
                <div className="lg:grid lg:grid-cols-2 lg:items-center lg:gap-x-8">
                    {/* Image */}
                    <div className="w-full overflow-hidden rounded-lg sm:rounded-lg">
                        <Image
                            src={`https://picsum.photos/800/800?random=${duck.id}`}
                            alt={`Bild von ${duck.name}`}
                            width={800}
                            height={800}
                            className="aspect-square w-full object-cover"
                        />
                    </div>

                    {/* Produkt-Infos ohne Top-Margin */}
                    <div className="px-4 sm:px-0">
                        <h1 className="text-3xl font-bold tracking-tight text-gray-900">{duck.name}</h1>

                        <div className="mt-3">
                            <p className="text-3xl tracking-tight text-gray-900">{duck.price} €</p>
                        </div>

                        <div className="mt-6 space-y-6 text-base text-gray-700">
                            <p>{duck.description}</p>
                        </div>

                        <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-gray-700">
                            <div>
                                <strong>Farbe:</strong> {duck.color}
                            </div>
                            <div>
                                <strong>Größe:</strong> {duck.size.toUpperCase()}
                            </div>
                            <div>
                                <strong>Material:</strong> {duck.material}
                            </div>
                            <div>
                                <strong>Marke:</strong> {duck.brand ?? "–"}
                            </div>
                            <div>
                                <strong>Herkunft:</strong> {duck.origin}
                            </div>
                            <div>
                                <strong>Hersteller:</strong> {duck.producer}
                            </div>
                            <div>
                                <strong>Gewicht:</strong> {duck.weight} kg
                            </div>
                        </div>

                        <form className="mt-10">
                            <div className="flex items-center gap-3">
                                <button type="button" className="rounded-md bg-gray-200 px-3 py-1 text-gray-700 hover:bg-gray-300">
                                    –
                                </button>
                                <span className="w-6 text-center">1</span>
                                <button type="button" className="rounded-md bg-gray-200 px-3 py-1 text-gray-700 hover:bg-gray-300">
                                    +
                                </button>
                            </div>

                            <div className="mt-6">
                                <button
                                    type="submit"
                                    className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50">
                                    In den Warenkorb
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </main>
        </div>
    );
}
