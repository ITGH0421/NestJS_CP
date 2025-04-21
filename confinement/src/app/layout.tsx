import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { ReactNode } from 'react';
import { ThemeProvider, CssBaseline, createTheme, Container } from '@mui/material';
import Header from '../sections/Header';
import Footer from '../sections/Footer';
import FloatingButton from '../sections/Whatsapp';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Chilli Padi Confinement",
  description: "Premium confinement meals delivered to your door",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <link rel="icon" href="/vercel.svg" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <CssBaseline />
        <Header />
       <main>{children}</main>
        <FloatingButton />
        <Footer />
      </body>
    </html>
  );
}
// This is a simple React component that renders a heading and a paragraph.