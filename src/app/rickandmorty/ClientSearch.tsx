"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { SimpleCharacter } from "../../types/rickandmorty";

function SearchBar({ onSearch }: { onSearch: (results: SimpleCharacter[]) => void }) {
  const [filters, setFilters] = useState({
    name: "",
    status: "",
    type: "",
    gender: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams();
      if (filters.name) queryParams.append("name", filters.name);
      if (filters.status) queryParams.append("status", filters.status);
      if (filters.type) queryParams.append("type", filters.type);
      if (filters.gender) queryParams.append("gender", filters.gender);
      
      if (Object.values(filters).some(v => v)) {
        const res = await fetch(
          `https://rickandmortyapi.com/api/character/?${queryParams}`
        );
        if (res.ok) {
          const data = await res.json();
          const results = data.results.map((char: any) => ({
            id: char.id,
            name: char.name,
            image: char.image,
            status: char.status,
          }));
          onSearch(results);
        } else {
          onSearch([]);
        }
      }
    } catch (error) {
      console.error("Error en búsqueda:", error);
      onSearch([]);
    } finally {
      setLoading(false);
    }
  };

  // Debounce automático
  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setTimeout(handleSearch, 500);
  };

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-8">
      <div className="flex items-center gap-2 mb-4">
        <svg className="text-white text-xl" fill="currentColor" viewBox="0 0 20 20" width="20" height="20">
          <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
        </svg>
        <h2 className="text-white text-xl font-semibold">Búsqueda en tiempo real</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <input
          type="text"
          placeholder="Nombre..."
          value={filters.name}
          onChange={(e) => handleFilterChange("name", e.target.value)}
          className="px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-600 focus:border-teal-400 outline-none"
        />
        <select
          value={filters.status}
          onChange={(e) => handleFilterChange("status", e.target.value)}
          className="px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-600"
        >
          <option value="">Todos los estados</option>
          <option value="alive">Vivo</option>
          <option value="dead">Muerto</option>
          <option value="unknown">Desconocido</option>
        </select>
        <input
          type="text"
          placeholder="Tipo (ej: Genetic experiment)..."
          value={filters.type}
          onChange={(e) => handleFilterChange("type", e.target.value)}
          className="px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-600"
        />
        <select
          value={filters.gender}
          onChange={(e) => handleFilterChange("gender", e.target.value)}
          className="px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-600"
        >
          <option value="">Todos los géneros</option>
          <option value="female">Femenino</option>
          <option value="male">Masculino</option>
          <option value="genderless">Sin género</option>
          <option value="unknown">Desconocido</option>
        </select>
      </div>
      
      {loading && (
        <div className="text-center text-white mt-4">
          <div className="inline-block animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
          <span className="ml-2">Buscando...</span>
        </div>
      )}
    </div>
  );
}

function CharacterGrid({ characters }: { characters: SimpleCharacter[] }) {
  if (characters.length === 0) {
    return (
      <div className="text-center text-white py-12">
        <p className="text-xl">No se encontraron personajes 😢</p>
        <p className="text-gray-400 mt-2">Intenta con otros filtros</p>
      </div>
    );
  }
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {characters.map((character) => (
        <Link
          key={character.id}
          href={`/rickandmorty/${character.id}`}
          className="transform transition hover:scale-105"
        >
          <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl cursor-pointer">
            <div className="relative h-64 w-full">
              <img
                src={character.image}
                alt={character.name}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="p-4">
              <h2 className="text-xl font-bold text-gray-800 capitalize">
                {character.name}
              </h2>
              <div className="flex items-center gap-2 mt-2">
                <span
                  className={`w-3 h-3 rounded-full ${
                    character.status === "Alive"
                      ? "bg-green-500"
                      : character.status === "Dead"
                      ? "bg-red-500"
                      : "bg-gray-500"
                  }`}
                />
                <p className="text-gray-600">{character.status}</p>
              </div>
              <p className="text-gray-400 text-sm mt-2">
                #{character.id.toString().padStart(3, "0")}
              </p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default function ClientSearch({ initialCharacters }: { initialCharacters: SimpleCharacter[] }) {
  const [displayCharacters, setDisplayCharacters] = useState(initialCharacters);
  
  return (
    <>
      <SearchBar onSearch={setDisplayCharacters} />
      <CharacterGrid characters={displayCharacters} />
    </>
  );
}