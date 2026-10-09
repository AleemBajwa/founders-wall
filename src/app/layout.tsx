import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

const siteUrl = "https://founders-wall.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "The 500 Founders Wall — The Archival Directory & Mosaic of 500 Internet Builders",
    template: "%s | The 500 Founders Wall",
  },
  description:
    "Secure your permanent dofollow slot on the internet before the bonding curve price climbs. First 10 slots are 100% FREE ($0.00). 500 immutable positions for indie hackers and startups.",
  keywords: [
    "startup directory",
    "free startup directory submission",
    "submit startup free dofollow",
    "indie hacker startup directory",
    "founders wall",
    "million dollar homepage for founders",
    "best startup directories to launch 2026",
    "algorithmic bonding curve startup directory",
    "promote indie project free dofollow",
    "showcase saas startup",
    "ai startup directory",
    "devtools startup directory",
  ],
  authors: [{ name: "Founders Wall Curators" }],
  creator: "Founders Wall",
  publisher: "The 500 Founders Wall",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "The 500 Founders Wall — 500 Permanent Positions for Internet Builders",
    description:
      "First 10 slots are 100% FREE ($0.00). As each tier sells out, the price climbs from $2 to $40. Permanent dofollow backlinks and collector-grade prestige.",
    url: siteUrl,
    siteName: "The 500 Founders Wall",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "The 500 Founders Wall — 500 Permanent Positions for Internet Builders",
    description:
      "First 10 slots are 100% FREE ($0.00). Claim your permanent position on the wall before the price climbs.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || "google-site-verification-placeholder",
  },
};

const jsonLdWebsite = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "The 500 Founders Wall",
  url: siteUrl,
  description:
    "An archival mosaic and directory indexing 500 internet builders and startups along an algorithmic bonding price curve. The first 10 positions are free.",
  potentialAction: {
    "@type": "SearchAction",
    target: `${siteUrl}/directory?q={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
};

const jsonLdOrganization = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "The 500 Founders Wall",
  url: siteUrl,
  logo: `${siteUrl}/favicon.ico`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased bg-[#fafaf9]">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWebsite) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdOrganization) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#fafaf9] text-[#080503] noise-overlay selection:bg-[#080503] selection:text-[#fafaf9]">
        {(() => {
          const gaId = process.env.NEXT_PUBLIC_GA_ID || "G-8CPJTNXZQ2";
          return (
            <>
              <Script
                strategy="afterInteractive"
                src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              />
              <Script
                id="google-analytics"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                  __html: `
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', '${gaId}', {
                      page_path: window.location.pathname,
                    });
                  `,
                }}
              />
            </>
          );
        })()}
        {children}
      </body>
    </html>
  );
}
