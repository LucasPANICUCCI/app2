import type { Metadata, Viewport } from "next";
import "@fontsource-variable/atkinson-hyperlegible-next";
import "@fontsource-variable/atkinson-hyperlegible-mono";
import "@fontsource-variable/source-serif-4";
import "./globals.css";
import { GlossaryProvider } from "@/components/ui/glossary";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: {
    default: "Vigie : six semaines pour comprendre la cybersécurité",
    template: "%s · Vigie",
  },
  description: "Un programme progressif de 42 séances de 15 à 20 minutes pour découvrir la cybersécurité, avec des exercices interactifs et simulés.",
};

export const viewport: Viewport = {
  themeColor: "#f2f5f8",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className="flex min-h-dvh flex-col antialiased">
        <GlossaryProvider>
          <Header />
          <main id="contenu" className="flex-1">
            {children}
          </main>
          <Footer />
        </GlossaryProvider>
      </body>
    </html>
  );
}
