import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import "@pollar/react/styles.css";
import { PollarClientProvider } from "@/components/providers/PollarClientProvider";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { AuthModal } from "@/components/AuthModal";

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
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[var(--background)] text-[var(--foreground)] min-h-screen transition-colors duration-200`}
      >
        <ThemeProvider>
          <PollarClientProvider>
            {children}
            <AuthModal />
          </PollarClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
