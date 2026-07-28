import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "Elementary Kit - One component tree. Every surface.",
  description: "A themeable onboarding content system rendered from the same React component tree.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={outfit.variable}>
      <body>
        <div className="mesh-bg"></div>
        {children}
      </body>
    </html>
  );
}
