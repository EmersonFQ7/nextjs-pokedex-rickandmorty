import Link from "next/link";
import { IoGameController, IoPlanet } from "react-icons/io5";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
      <div className="max-w-7xl mx-auto px-4 py-20">
        <h1 className="text-5xl md:text-6xl font-bold text-white text-center mb-6">
          Bienvenido a mi Wiki Multiversal
        </h1>
        <p className="text-xl text-gray-300 text-center mb-12">
          Explora dos mundos increíbles con Next.js (SSG + ISR)
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Tarjeta de Pokémon */}
          <Link href="/pokemon" className="group">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center hover:bg-white/20 transition-all duration-300 hover:scale-105">
              <div className="bg-red-500 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <IoGameController size={40} className="text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Pokédex</h2>
              <p className="text-gray-300">
                Explora los 151 Pokémon originales con ISR (revalidación cada 24h)
              </p>
            </div>
          </Link>
          
          {/* Tarjeta de Rick and Morty */}
          <Link href="/rickandmorty" className="group">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center hover:bg-white/20 transition-all duration-300 hover:scale-105">
              <div className="bg-teal-500 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <IoPlanet size={40} className="text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Rick and Morty</h2>
              <p className="text-gray-300">
                Descubre todos los personajes con SSG + búsqueda en tiempo real
              </p>
            </div>
          </Link>
        </div>
        
        <div className="mt-16 text-center text-gray-400 text-sm">
          <p>Construido con Next.js 16 | SSG | ISR | Tailwind CSS</p>
        </div>
      </div>
    </div>
  );
}