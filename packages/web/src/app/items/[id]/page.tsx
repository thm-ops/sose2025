import { rubberDuckData } from '@/data/data';
import { RubberDuckSchema } from '@/lib/model/rubberduck/Rubberduck.type';

export default async function ItemsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const duckId = parseInt(id, 10);
  const rawDuck = rubberDuckData.find((duck) => duck.id === duckId);

  {/*Fehler, falls kein gültiges Produkt angefrgat wird*/}
  if (!rawDuck) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600 text-xl font-bold">
        FEHLER!!! ID {duckId} ist kein gültiges Produkt.
      </div>
    )
  }

  {/*Checken, Ob das Objekt unserm Schema entspricht */}
  const duck = RubberDuckSchema.parse(rawDuck);

  return (
    <main className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-2xl p-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Placeholder Image von extren laden weil es besser aussieht*/}
          <div className="flex-shrink-0">
            <img
              src="https://placehold.co/300x300?text=Rubber+Duck"
              alt={`Bild von ${duck.name}`}
              className="rounded-xl border border-gray-200"
              width={300}
              height={300}
            />
          </div>

          {/* Duck Info darstellen */}
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">{duck.name}</h1>
            <p className="text-gray-600 mb-4 italic">{duck.description}</p>

            <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-gray-700">
              <div><strong>Preis:</strong> {duck.price} €</div>
              <div><strong>Farbe:</strong> {duck.color}</div>
              <div><strong>Größe:</strong> {duck.size.toUpperCase()}</div>
              <div><strong>Material:</strong> {duck.material}</div>
              <div><strong>Marke:</strong> {duck.brand ?? '—'}</div>
              <div><strong>Herkunft:</strong> {duck.origin}</div>
              <div><strong>Hersteller:</strong> {duck.producer}</div>
              <div><strong>Gewicht:</strong> {duck.weight} kg</div>
            </div>

            {/* schonmal ein Wareknkorb Button für die spätere Funktion */}
            <div className="mt-6">
              <a href=""
                className="inline-block px-4 py-2 bg-yellow-400 hover:bg-yellow-500 text-white font-semibold rounded shadow">
                Zum Warenkorb hinzufügen
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
