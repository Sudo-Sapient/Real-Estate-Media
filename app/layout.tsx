import type { Metadata } from "next";
import { Manrope, Geist_Mono, Source_Serif_4 } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const sourceSerif = Source_Serif_4({
  variable: "--font-source-serif",
  subsets: ["latin"],
  style: ["italic"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://sudoestate.com"),
  title: "Sudo Estate — Cinematic AI Ads for Real Estate",
  description:
    "Sudo Estate turns property listings into cinematic AI campaigns for real estate agents, brokerages, and developers.",
  keywords: ["real estate advertising", "AI property ads", "cinematic real estate video", "property marketing"],
  openGraph: {
    title: "Sudo Estate — Cinematic AI Ads for Real Estate",
    description: "Turn existing property media into scroll-stopping campaigns.",
    type: "website",
    images: [{ url: "/estate/hero-villa.jpg", width: 2200, height: 1496, alt: "Sudo Estate cinematic property campaign" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sudo Estate — Cinematic AI Ads for Real Estate",
    description: "Turn existing property media into scroll-stopping campaigns.",
    images: ["/estate/hero-villa.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${geistMono.variable} ${sourceSerif.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-black">{children}</body>
    </html>
  );
}
