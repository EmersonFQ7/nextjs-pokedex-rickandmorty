import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mi Aplicación",
  description: "Pokédex y Rick and Morty Wiki",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
        {children}
      </body>
    </html>
  );
}