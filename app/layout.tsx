import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import "@pollar/react/styles.css";
import { PollarClientProvider } from "@/components/providers/PollarClientProvider";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "char | Africa ⇄ Bolivia Settlement & Yield Escrow",
  description: "The direct trade and settlement corridor between Africa and Latin America (Bolivia) powered by Pollar and Stellar with auto-yield escrow.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#e9edf3] text-slate-800 min-h-screen`}
      >
        <PollarClientProvider>
          {children}
        </PollarClientProvider>
      </body>
    </html>
  );
}
