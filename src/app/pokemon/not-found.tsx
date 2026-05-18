import Link from "next/link";
import { IoSadOutline, IoHome } from "react-icons/io5";

export default function PokemonNotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center">
        <div className="bg-yellow-100 rounded-full w-24 h-24 mx-auto mb-6 flex items-center justify-center">
          <IoSadOutline size={48} className="text-yellow-600" />
        </div>
        
        <h2 className="text-3xl font-bold text-white mb-4">
          ¡Pokémon no encontrado!
        </h2>
        
        <p className="text-gray-200 mb-6 max-w-md mx-auto">
          El Pokémon que estás buscando no existe en nuestra Pokédex. 
          Verifica el nombre o intenta con otro.
        </p>
        
        <div className="space-y-3">
          <Link
            href="/pokemon"
            className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-6 rounded-lg transition"
          >
            <IoHome size={20} />
            Ver todos los Pokémon
          </Link>
        </div>

        {/* Sugerencia de nombres comunes */}
        <div className="mt-8 text-gray-300 text-sm">
          <p>Ejemplos de nombres válidos:</p>
          <div className="flex flex-wrap justify-center gap-2 mt-2">
            {["pikachu", "charizard", "bulbasaur", "squirtle", "mewtwo"].map((name) => (
              <Link
                key={name}
                href={`/pokemon/${name}`}
                className="hover:text-purple-300 underline transition"
              >
                {name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}