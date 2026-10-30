import type { Metadata } from "next";
import { Syne, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";

const syne = Syne({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-syne",
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: "PIXELL — Full-Service Digital Agency",
  description: "We Don't Just Manage Brands — We Make Them Matter. Complete digital solutions including social media, brand growth, content strategy, digital marketing & web development.",
  keywords: ["digital agency", "social media management", "brand growth", "content strategy", "digital marketing", "web development"],
  authors: [{ name: "PIXELL" }],
  openGraph: {
    title: "PIXELL — Full-Service Digital Agency",
    description: "We Don't Just Manage Brands — We Make Them Matter. Strategic digital solutions that grow your brand.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="dark" className={`${syne.variable} ${plusJakartaSans.variable}`} suppressHydrationWarning>
      <body className="antialiased">
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
