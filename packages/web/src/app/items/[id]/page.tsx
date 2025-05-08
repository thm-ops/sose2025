import { rubberDuckData } from '@/data/data';
import { RubberDuckSchema } from '@/lib/model/rubberduck/Rubberduck.type';

/*Extract DuckId from slugs*/
export default async function ItemsPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const duckId = parseInt(id, 10);
    const rawDuck = rubberDuckData.find((duck) => duck.id === duckId);

    {/*Error in case no valid product is requested*/}
    if (!rawDuck) {
        return (
        <div className="min-h-screen flex items-center justify-center text-red-600 text-xl font-bold bg-white">
            FEHLER!!! ID {duckId} ist kein gültiges Produkt.
        </div>
        );
    }

    {/*Check if the object matches our schema*/}
    const duck = RubberDuckSchema.parse(rawDuck);

    return (
        <main className="min-h-screen bg-gradient-to-br from-gray-100 to-white py-10 px-6">
        <div className="max-w-7xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden grid md:grid-cols-2">
            {/* Image section */}
            <div className="flex flex-col items-center justify-center p-10 bg-gray-50">
            <img
                src="https://placehold.co/400x400?text=Rubber+Duck"
                alt={`Bild von ${duck.name}`}
                className="w-80 h-80 object-contain mb-6 rounded-xl"
            />
            </div>

            {/* Display Duck Infos */}
            <div className="p-10">
            <p className="text-sm text-gray-500 uppercase tracking-wide mb-1">Rubber Duck</p>
            <h1 className="text-3xl font-bold text-gray-800 mb-4">{duck.name}</h1>

            <p className="text-gray-600 mb-6">{duck.description}</p>

            <div className="flex items-center gap-4 mb-6">
                <span className="text-2xl font-semibold text-gray-900">{duck.price} €</span>
                <span className="text-green-500 font-medium text-sm">Auf Lager</span>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm text-gray-700 mb-8">
                <div><strong>Farbe:</strong> {duck.color}</div>
                <div><strong>Größe:</strong> {duck.size.toUpperCase()}</div>
                <div><strong>Material:</strong> {duck.material}</div>
                <div><strong>Marke:</strong> {duck.brand ?? '—'}</div>
                <div><strong>Herkunft:</strong> {duck.origin}</div>
                <div><strong>Hersteller:</strong> {duck.producer}</div>
                <div><strong>Gewicht:</strong> {duck.weight} kg</div>
            </div>

            <div className="flex items-center gap-3 mb-6">
                <button className="bg-gray-200 text-gray-700 px-3 py-1 rounded">-</button>
                <span className="w-6 text-center">1</span>
                <button className="bg-gray-200 text-gray-700 px-3 py-1 rounded">+</button>
            </div>

            {/*A shopping cart button for future functionality*/}
            <div className="flex gap-4">
                <button className="px-6 py-3 bg-black text-white font-semibold rounded-xl hover:bg-gray-900">
                In den Warenkorb
                </button>
            </div>
            </div>
        </div>
        </main>
    );
}
