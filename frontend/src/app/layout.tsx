// app/layout.tsx
import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";
import ClientLayoutExtras from "@/app/components/ClientLayoutExtras";
import "./globals.css";

import { Outfit } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";

const fontMain = Outfit({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-outfit",
  weight: ["300", "400", "500", "700", "900"],
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

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#000000",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${fontMain.variable} ${fontMain.className}`} suppressHydrationWarning>
      <head>
        <link rel="icon" href="/GEDS Inovação.png" />
      </head>
      <body className="relative min-h-screen flex flex-col bg-background text-foreground selection:bg-cyan selection:text-black antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          <main className="flex-1 overflow-x-hidden">{children}</main>
          <Footer />
          <ClientLayoutExtras />
        </ThemeProvider>
      </body>
    </html>
  );
}
