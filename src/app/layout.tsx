import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "The 500 Founders Wall — The Archival Mosaic of Internet Builders",
  description: "Secure your permanent slot on the internet before the algorithmic bonding price climbs. 500 immutable slots, permanent dofollow links, collector-grade prestige.",
  keywords: ["founders wall", "million dollar homepage", "indie hackers", "startup directory", "build in public", "algorithmic bonding curve"],
  openGraph: {
    title: "The 500 Founders Wall — The Archival Mosaic of Internet Builders",
    description: "500 permanent slots on the internet. As each tier sells out, the price climbs permanently.",
    type: "website",
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
