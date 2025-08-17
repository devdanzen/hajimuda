import type { Metadata } from "next";
import { Cinzel_Decorative,Roboto_Slab } from "next/font/google";

import CustomThemeProvider from "@/components/theme-provider";

import "./globals.css";

const robotoSlab = Roboto_Slab({
  subsets: ["latin"],
  variable: "--font-family",
  display: "swap",
});

const cinzelDecorative = Cinzel_Decorative({
  weight: ["400", "700", "900"],
  subsets: ["latin"],
  variable: "--font-title",
  display: "swap",
});

export const metadata: Metadata = {
  title: "HajiMuda - Wujudkan Haji & Umrah yang Damai",
  description: "Layanan Haji dan Umrah terpercaya dengan bimbingan ibadah komprehensif, akomodasi berkualitas, dan pendampingan 24/7. Raih ketenangan hati dengan ibadah yang lebih nyaman bersama HajiMuda.",
  keywords: "haji, umrah, ibadah, makkah, madinah, travel haji, paket umrah, bimbingan haji",
  authors: [{ name: "HajiMuda" }],
  creator: "HajiMuda",
  publisher: "HajiMuda",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className={`${robotoSlab.className} ${cinzelDecorative.variable}`}>
        <CustomThemeProvider>
          {children}
        </CustomThemeProvider>
      </body>
    </html>
  );
}
