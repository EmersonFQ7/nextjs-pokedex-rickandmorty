import { ReactNode } from "react";
import { Metadata } from "next";
import { MdRocketLaunch } from "react-icons/md";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Rick and Morty - Wiki",
  description: "Explora el universo de Rick and Morty",
};

export default function RickAndMortyLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-900 to-emerald-900">
      <nav className="bg-black bg-opacity-40 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link
              href="/rickandmorty"
              className="text-white text-2xl font-bold hover:text-teal-300 transition flex items-center gap-2"
            >
              <MdRocketLaunch size={30} />
              Rick and Morty Wiki
            </Link>
            <Link
              href="/"
              className="text-white hover:text-teal-300 transition text-sm"
            >
              Volver al inicio
            </Link>
          </div>
        </div>
      </nav>
      {children}
    </div>
  );
}