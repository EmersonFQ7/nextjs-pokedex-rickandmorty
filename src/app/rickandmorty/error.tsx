"use client";

import { IoWarning, IoRefresh } from "react-icons/io5";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center">
        <div className="bg-red-100 rounded-full w-24 h-24 mx-auto mb-6 flex items-center justify-center">
          <IoWarning size={48} className="text-red-600" />
        </div>
        <h2 className="text-3xl font-bold text-white mb-4">
          ¡Error al cargar personajes!
        </h2>
        <p className="text-gray-200 mb-6">{error.message}</p>
        <button
          onClick={reset}
          className="bg-teal-600 hover:bg-teal-700 text-white font-semibold py-2 px-6 rounded-lg inline-flex items-center gap-2"
        >
          <IoRefresh /> Intentar nuevamente
        </button>
      </div>
    </div>
  );
}