import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";
import { Nav } from "../components/Nav";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Quantum Shop Studio LLC",
  description:
    "Shopify theme development, Liquid customization, Shopify 2.0, site optimization, and GitHub-based workflows.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Nav />
        <main className="mx-auto max-w-6xl px-4 py-12 md:py-16">{children}</main>
        <footer className="border-t border-white/10">
          <div className="mx-auto max-w-6xl px-4 py-10 text-sm text-slate-300">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <span>© {new Date().getFullYear()} Quantum Shop Studio LLC</span>
              <div className="flex flex-col gap-2 md:items-end">
                <span className="text-slate-400">
                  Shopify theme engineering • GitHub workflows • AI-accelerated delivery
                </span>
                <div className="flex gap-4">
                  <Link className="text-slate-300 hover:text-white hover:underline" href="/terms">
                    Terms of Use
                  </Link>
                  <Link className="text-slate-300 hover:text-white hover:underline" href="/privacy">
                    Privacy Policy
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
