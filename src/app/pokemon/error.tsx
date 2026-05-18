"use client"; // Los componentes de error deben ser Client Components

import { useEffect } from "react";
import { IoWarning, IoRefresh } from "react-icons/io5";
import Link from "next/link";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function PokemonError({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Puedes enviar el error a un servicio de reporte de errores aquí
    console.error("Error en la página de Pokémons:", error);
  }, [error]);

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center">
        <div className="bg-red-100 rounded-full w-24 h-24 mx-auto mb-6 flex items-center justify-center">
          <IoWarning size={48} className="text-red-600" />
        </div>
        
        <h2 className="text-3xl font-bold text-white mb-4">
          ¡Algo salió mal!
        </h2>
        
        <p className="text-gray-200 mb-6 max-w-md mx-auto">
          No pudimos cargar la lista de Pokémons. Por favor, intenta nuevamente.
        </p>
        
        <div className="space-y-3">
          <button
            onClick={reset}
            className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-6 rounded-lg transition"
          >
            <IoRefresh size={20} />
            Intentar nuevamente
          </button>
          
          <div>
            <Link
              href="/"
              className="text-purple-300 hover:text-white underline transition"
            >
              Volver al inicio
            </Link>
          </div>
        </div>

        {/* Opcional: mostrar detalles del error en desarrollo */}
        {process.env.NODE_ENV === "development" && (
          <div className="mt-8 p-4 bg-red-900/50 rounded-lg text-left max-w-lg mx-auto">
            <p className="text-sm text-red-200 font-mono">
              <strong>Error:</strong> {error.message}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}