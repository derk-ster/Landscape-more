import type { Metadata } from "next";
import { Source_Serif_4, DM_Sans } from "next/font/google";
import { QuoteProvider } from "@/context/QuoteContext";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: "swap",
});

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-source-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Landscape & More | Landscaping Supplies in Madill, OK",
  description:
    "Greenhouse plants, metal yard art, pottery, topsoil, river rock, signs, and landscaping supplies at Landscape & More on US-70 in Madill, Oklahoma.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${dmSans.variable} ${sourceSerif.variable}`}>
      <body className="font-sans">
        <QuoteProvider>{children}</QuoteProvider>
      </body>
    </html>
  );
}
