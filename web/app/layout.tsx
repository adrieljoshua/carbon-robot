import Script from "next/script"; // Import Next.js Script component
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { archivo, vt323, syne, tacticalSans } from "./styles/fonts";
import { Toaster } from "@/components/ui/toaster";
import { DataProvider } from "../context/Context";
import { WalletProvider } from "@/utils/context/WalletContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CrarbonX",
  description: "Carbon Credits on Starknet",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
          integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
          crossOrigin=""
        />
      </head>

      <body
        className={`${archivo.variable} ${vt323.variable} ${syne.variable} ${tacticalSans.variable} ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <WalletProvider>
          <DataProvider>
            {children}
            <Toaster />
          </DataProvider>
        </WalletProvider>

        {/* Load Leaflet asynchronously with next/script */}
        <Script
          src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
          strategy="afterInteractive" // Ensures it loads after hydration
          integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo="
          crossOrigin=""
        />
      </body>
    </html>
  );
}
