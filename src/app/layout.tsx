import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://founders-wall.vercel.app"),
  title: "The 500 Founders Wall — The Archival Mosaic of Internet Builders",
  description: "Secure your permanent slot on the internet before the price bonding curve climbs. First 10 slots are 100% FREE ($0.00). 500 immutable positions for builders.",
  keywords: ["founders wall", "million dollar homepage", "indie hackers", "startup directory", "build in public", "algorithmic bonding curve"],
  openGraph: {
    title: "The 500 Founders Wall — 500 Positions for Internet Builders",
    description: "The first 10 slots are 100% FREE ($0.00). As each tier sells out, the price climbs from $2 to $40. Grab your permanent slot.",
    url: "https://founders-wall.vercel.app",
    siteName: "The Founders Wall",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "The 500 Founders Wall — 500 Positions for Internet Builders",
    description: "First 10 slots are 100% FREE ($0.00). Claim your permanent position on the wall before the price climbs.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased bg-[#fafaf9]">
      <body className="min-h-full flex flex-col bg-[#fafaf9] text-[#080503] noise-overlay selection:bg-[#080503] selection:text-[#fafaf9]">
        {children}
      </body>
    </html>
  );
}
