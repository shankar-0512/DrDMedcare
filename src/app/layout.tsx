import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Geist_Mono } from "next/font/google";
import "./globals.css";
import AppShell from "@/components/AppShell";
import { Analytics } from "@vercel/analytics/next";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://drdmedcare.com'),
  verification: {
    google: 'adqxEXshCADg4T53hLT0h-Vei2piRlb5pcr1kLCXJnY',
  },
  alternates: {
    canonical: 'https://drdmedcare.com',
    languages: { 'en-IN': 'https://drdmedcare.com' },
  },
  title: "Dr D's MedCare - Medication Counselling by a Clinical Pharmacist",
  description: "Personalised medication counselling sessions with Dr Priyanka Deventhiran, Pharm D. Understand your prescription, interactions, and side effects. India only.",
  icons: {
    icon: "/logo.png",
  },
  openGraph: {
    title: "Dr D's MedCare - Understand your medicines before you take them",
    description: "Personalised medication counselling sessions with Dr Priyanka Deventhiran, Pharm D. India only. Education only.",
    type: 'website',
    url: 'https://drdmedcare.com',
    images: [{ url: '/ogimage.png' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Dr D's MedCare",
    description: "Personalised medication counselling sessions for patients in India.",
    images: ['/ogimage.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-IN">
      <body className={`${jakarta.variable} ${geistMono.variable} antialiased`}>
        <AppShell>{children}</AppShell>
        <Analytics />
      </body>
    </html>
  );
}