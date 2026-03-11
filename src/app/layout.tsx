import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: {
    default: "ŠK Sačurov – Futbalový klub",
    template: "%s | ŠK Sačurov",
  },
  description: "Oficiálna webová stránka futbalového klubu ŠK Sačurov. Výsledky, program, tabuľky, novinky a informácie o klube.",
  keywords: ["ŠK Sačurov", "futbal", "futbalový klub", "Sačurov", "VII. liga", "ObFZ Vranov"],
  openGraph: {
    type: "website",
    locale: "sk_SK",
    siteName: "ŠK Sačurov",
    title: "ŠK Sačurov – Futbalový klub",
    description: "Oficiálna webová stránka futbalového klubu ŠK Sačurov.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sk">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </head>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
