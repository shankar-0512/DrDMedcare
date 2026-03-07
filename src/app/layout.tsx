import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AppShell from "@/components/AppShell";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://drdmedcare.vercel.app'),
  title: "Dr D's MedCare",
  description: "Prescription & medication education for patients in India. Education only. No diagnosis or prescribing.",
  icons: {
    icon: "/logo.png",
  },
  openGraph: {
    title: "Dr D's MedCare — Understand your medicines before you take them",
    description: "Personalised medication counselling sessions with Dr Priyanka Deventhiran, Pharm D. India only. Education only.",
    type: 'website',
    url: 'https://drdmedcare.vercel.app',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Dr D's MedCare",
    description: "Personalised medication counselling sessions for patients in India.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-slate-100 text-slate-900`}>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}