import { Analytics } from "@vercel/analytics/next";
import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://dania-tech-corner.vercel.app"),
  title: "Dannia Tech Corner — Explore. Learn. Build.",
  description:
    "Um espaço para explorar tecnologias, conhecer ferramentas e encontrar inspiração para o próximo projeto.",
  openGraph: {
    title: "Dannia Tech Corner — Explore. Learn. Build.",
    description:
      "Um espaço para explorar tecnologias, conhecer ferramentas e encontrar inspiração para o próximo projeto.",
    url: "https://dania-tech-corner.vercel.app",
    siteName: "Dannia Tech Corner",
    images: [
      {
        url: "/apple-icon.png",
        width: 512,
        height: 512,
        alt: "Dannia Tech Corner",
      },
    ],
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Dannia Tech Corner — Explore. Learn. Build.",
    description:
      "Um espaço para explorar tecnologias, conhecer ferramentas e encontrar inspiração para o próximo projeto.",
    images: ["/apple-icon.png"],
  },
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
};

export const viewport: Viewport = {
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F5F7FC" },
    { media: "(prefers-color-scheme: dark)", color: "#0B1020" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="antialiased">
        {children}
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  );
}
