import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/layout/SmoothScroll";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LUXORA X1 | Premium Smart Wireless Headphones",
  description: "Experience AI-powered sound optimization and spatial 360° audio with the new LUXORA X1. The ultimate in active noise cancellation and smart touch controls.",
  keywords: ["LUXORA X1", "wireless headphones", "premium headphones", "noise cancellation", "spatial audio"],
  authors: [{ name: "Luxora" }],
  openGraph: {
    title: "LUXORA X1 | Premium Smart Wireless Headphones",
    description: "Experience AI-powered sound optimization and spatial 360° audio with the new LUXORA X1.",
    url: "https://luxora-x1.com",
    siteName: "Luxora",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased selection:bg-white selection:text-black`}>
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
