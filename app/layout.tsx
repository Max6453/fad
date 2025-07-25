import type { Metadata } from "next";
import { Viewport } from "next";
import { Faster_One, Electrolize } from "next/font/google";
import "./globals.css";

const electrolize = Electrolize({
  variable: "--font-electrolize",
  weight: "400",
  subsets: ["latin"],
});

const fasterOne = Faster_One({
  variable: "--font-faster-one",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FAD | Dashboard",
  description: "Open F1 Database to view cornering speeds across many famous corners ",
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  // Also supported but less commonly used
  // interactiveWidget: 'resizes-visual',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${fasterOne.variable} ${electrolize.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
