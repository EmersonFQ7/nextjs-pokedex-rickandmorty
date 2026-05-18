import { SimpleCharacter } from "../../types/rickandmorty";
import ClientSearch from "./ClientSearch";

async function getInitialCharacters(): Promise<SimpleCharacter[]> {
  const res = await fetch("https://rickandmortyapi.com/api/character", {
    cache: "force-cache", // Forzar caché (SSG)
  });
  
  if (!res.ok) throw new Error("Error al cargar personajes");
  
  const data = await res.json();
  
  return data.results.map((char: any) => ({
    id: char.id,
    name: char.name,
    image: char.image,
    status: char.status,
  }));
}

export default async function RickAndMortyPage() {
  const initialCharacters = await getInitialCharacters();
  
  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-white text-center mb-4">
          Personajes de Rick and Morty
        </h1>
        <p className="text-gray-300 text-center mb-12">
          SSR con caché forzada (SSG) | Búsqueda en tiempo real (CSR)
        </p>
        
        {/* El componente cliente recibe los datos iniciales */}
        <ClientSearch initialCharacters={initialCharacters} />
      </div>
    </div>
  );
}