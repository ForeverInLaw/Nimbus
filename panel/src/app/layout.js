import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import QueryProvider from "@/shared/components/providers/QueryProvider";
import ToastProvider from "@/shared/components/providers/ToastProvider";
import { CommandPalette } from "@/shared/components/command-palette";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Nimbus Control Panel",
  description: "Modern admin panel for Nimbus - Agent and DNS management system",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <QueryProvider>
          <CommandPalette />
          <ToastProvider />
          {children}
        </QueryProvider>
      </body>
    </html>
  );
}
