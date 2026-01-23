// app/layout.tsx
import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";
import ClientLayoutExtras from "@/app/components/ClientLayoutExtras";
import "./globals.css";

import { Roboto } from "next/font/google";

// Configura a fonte Roboto com Next.js
const roboto = Roboto({
  weight: ["400", "700"],
  subsets: ["latin"],
});

export const metadata = {
  title: "GEDS Inovação",
  description: "Soluções de tecnologia sob medida para o seu negócio.",
  icons: {
    icon: "/GEDS Inovação.png",
    apple: "/GEDS Inovação.png",
  },
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    title: "GEDS Inovação",
  },
};

// Viewport agora recebe o themeColor (resolvendo o warning)
export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#facc15",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={roboto.className}>
      <head>
        {/* O Next.js gerencia title, description e icons automaticamente */}
        <link rel="icon" href="/GEDS Inovação.png" />
      </head>
      <body className="relative min-h-screen flex flex-col bg-black text-white selection:bg-cyan selection:text-black">
        <Header />
        <main className="flex-1 overflow-x-hidden">{children}</main>
        <Footer />
        <ClientLayoutExtras />
      </body>
    </html>
  );
}
