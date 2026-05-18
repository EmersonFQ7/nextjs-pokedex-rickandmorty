import Link from "next/link";
import { IoSadOutline } from "react-icons/io5";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center">
        <div className="bg-yellow-100 rounded-full w-24 h-24 mx-auto mb-6 flex items-center justify-center">
          <IoSadOutline size={48} className="text-yellow-600" />
        </div>
        <h2 className="text-3xl font-bold text-white mb-4">
          Personaje no encontrado
        </h2>
        <p className="text-gray-200 mb-6">
          El personaje que buscas no existe en el universo de Rick and Morty
        </p>
        <Link
          href="/rickandmorty"
          className="bg-teal-600 hover:bg-teal-700 text-white font-semibold py-2 px-6 rounded-lg inline-block"
        >
          Ver todos los personajes
        </Link>
      </div>
    </div>
  );
}