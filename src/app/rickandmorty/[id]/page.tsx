import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Character, ApiResponse } from "../../../types/rickandmorty";

// Generar rutas estáticas para los primeros 20 personajes (SSG)
export async function generateStaticParams() {
  const res = await fetch("https://rickandmortyapi.com/api/character");
  const data: ApiResponse<Character> = await res.json();
  
  // Generar páginas para los primeros 20 personajes (página 1)
  return data.results.map((character) => ({
    id: character.id.toString(),
  }));
}

// Obtener personaje por ID con ISR (revalidación cada 10 días)
async function getCharacter(id: string): Promise<Character> {
  const res = await fetch(`https://rickandmortyapi.com/api/character/${id}`, {
    next: { revalidate: 864000 }, // 10 días en segundos (10 * 24 * 60 * 60)
  });
  
  if (!res.ok) notFound();
  
  return res.json();
}

// Metadata dinámica
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const character = await getCharacter(id);
  
  return {
    title: `${character.name} - Rick and Morty Wiki`,
    description: `Información sobre ${character.name} - Estado: ${character.status}, Especie: ${character.species}`,
  };
}

// Formatear fecha
function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function CharacterDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const character = await getCharacter(id);
  
  const statusColor = {
    Alive: "bg-green-500",
    Dead: "bg-red-500",
    unknown: "bg-gray-500",
  }[character.status];
  
  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto">
        <Link
          href="/rickandmorty"
          className="inline-flex items-center gap-2 text-white hover:text-teal-300 transition mb-6"
        >
          ← Volver a la lista
        </Link>
        
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Header con imagen y estado */}
          <div className="relative h-96 w-full bg-gradient-to-r from-teal-600 to-emerald-600">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-64 h-64 rounded-full overflow-hidden border-4 border-white shadow-xl">
                <Image
                  src={character.image}
                  alt={character.name}
                  fill
                  sizes="256px"
                  className="object-cover"
                  priority
                />
              </div>
            </div>
            <div className="absolute top-4 right-4">
              <span className={`${statusColor} text-white px-4 py-2 rounded-full font-semibold shadow-lg`}>
                {character.status}
              </span>
            </div>
          </div>
          
          {/* Información del personaje */}
          <div className="p-8">
            <h1 className="text-4xl font-bold text-gray-800 text-center mb-2">
              {character.name}
            </h1>
            <p className="text-gray-500 text-center mb-8">
              #{character.id.toString().padStart(3, "0")}
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Columna izquierda */}
              <div className="space-y-4">
                <div className="border-b pb-2">
                  <h3 className="text-sm text-gray-500 uppercase">Especie</h3>
                  <p className="text-xl font-semibold text-gray-800">{character.species}</p>
                </div>
                <div className="border-b pb-2">
                  <h3 className="text-sm text-gray-500 uppercase">Tipo</h3>
                  <p className="text-xl font-semibold text-gray-800">
                    {character.type || "Desconocido"}
                  </p>
                </div>
                <div className="border-b pb-2">
                  <h3 className="text-sm text-gray-500 uppercase">Género</h3>
                  <p className="text-xl font-semibold text-gray-800 capitalize">
                    {character.gender}
                  </p>
                </div>
              </div>
              
              {/* Columna derecha */}
              <div className="space-y-4">
                <div className="border-b pb-2">
                  <h3 className="text-sm text-gray-500 uppercase">Origen</h3>
                  <p className="text-xl font-semibold text-gray-800">
                    {character.origin.name}
                  </p>
                </div>
                <div className="border-b pb-2">
                  <h3 className="text-sm text-gray-500 uppercase">Ubicación actual</h3>
                  <p className="text-xl font-semibold text-gray-800">
                    {character.location.name}
                  </p>
                </div>
                <div className="border-b pb-2">
                  <h3 className="text-sm text-gray-500 uppercase">Aparece en</h3>
                  <p className="text-lg font-semibold text-gray-800">
                    {character.episode.length} episodios
                  </p>
                </div>
              </div>
            </div>
            
            {/* Fecha de creación */}
            <div className="mt-8 pt-4 border-t text-center text-gray-400 text-sm">
              Creado en la base de datos: {formatDate(character.created)}
            </div>
          </div>
        </div>
        
        {/* Info de revalidación (solo desarrollo) */}
        {process.env.NODE_ENV === "development" && (
          <div className="mt-4 text-center text-gray-400 text-xs">
            ISR activo - Revalidación cada 10 días
          </div>
        )}
      </div>
    </div>
  );
}