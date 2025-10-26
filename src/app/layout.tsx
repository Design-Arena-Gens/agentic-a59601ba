import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const title = "Shortsmith Agent";
const description = "Generate ready-to-shoot YouTube Shorts with scripts, shot lists, and assets.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title,
    description
  }
};

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} min-h-screen bg-slate-950 bg-grid text-slate-100`}>
        <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-950/80 to-slate-900/60">
          {children}
        </div>
      </body>
    </html>
  );
}
