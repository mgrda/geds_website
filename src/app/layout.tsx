// app/layout.tsx
import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";
import GoldChatWidget from "@/app/components/GoldChatWidget";
import Libras from "@/app/components/Libras"; // Importa o componente Libras
import "./globals.css";

export const metadata = {
  title: "GEDS Inovação",
  description: "Soluções de tecnologia sob medida para o seu negócio.",
  icons: {
    icon: "/GEDS Inovação.png", // ícone padrão
    apple: "/GEDS Inovação.png", // ícone para iOS
  },
  manifest: "/manifest.json",
  themeColor: "#facc15",
  appleWebApp: {
    capable: true,
    title: "GEDS Inovação",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        {/* Metadados gerenciados automaticamente pelo Next.js */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap" />
        <link rel="icon" href="/ynnothivix.png" />
      </head>
      <body className="relative min-h-screen flex flex-col bg-white text-gray-900">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <GoldChatWidget />
        <Libras /> {/* Adiciona o ícone de Libras em todas as páginas */}
      </body>
    </html>
  );
}
