import type { Metadata } from "next";
import { Syne, Manrope } from "next/font/google";
import "./globals.css";
import "../styles/effects.css";

const display = Syne({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

const body = Manrope({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Atelier Plans Offshore — Plans & conception BTP",
  description:
    "Site vitrine : 15 ans en entreprise, 20 ans en freelance. Plans BTP et collaborations internationales. Contact France — LinkedIn, e-mail, Facebook.",
  openGraph: {
    title: "Atelier Plans Offshore",
    description: "Plans & conception BTP — vitrine immersive",
    locale: "fr_FR",
    type: "website",
    siteName: "Atelier Plans Offshore",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Atelier Plans Offshore",
    description:
      "Conception de plans BTP et offshore. 15 ans entreprise, 20 ans freelance, collaborations internationales.",
    url: "https://atelier-plans-offshore.fr",
    email: "contact@exemple-btp.fr",
    areaServed: "FR",
    knowsAbout: ["Plans BTP", "Plans offshore", "Plans d'exécution", "Plans de permis"],
  };

  return (
    <html lang="fr" className={`${display.variable} ${body.variable} h-full antialiased`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full">{children}</body>
    </html>
  );
}
