import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";

const roboto = Roboto({
  weight: ["300", "400", "500", "700", "900"],
  subsets: ["latin"],
  variable: "--font-roboto",
});

export const metadata: Metadata = {
  title: "Morphing Presentation Deck",
  description: "Next.js morph animated presentation slides",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${roboto.className} bg-neutral-950 text-neutral-100 antialiased overflow-hidden select-none`}>
        {children}
      </body>
    </html>
  );
}