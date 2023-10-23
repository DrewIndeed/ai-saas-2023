import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import CrispProvider from "@/components/CrispProvider";
import ModalProvider from "@/components/ModalProvider";
import ToasterProvider from "@/components/ToasterProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Maximus AI",
  description: "An SaaS AI Platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          <link rel="icon" href="/logo.png" />
        </head>
        <CrispProvider />
        <body className={inter.className}>
          <ToasterProvider />
          <ModalProvider /> {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
