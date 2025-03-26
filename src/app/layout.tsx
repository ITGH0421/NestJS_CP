import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "@/styles/globals.css";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata: Metadata = {
  title: "Chilli Padi Confinement",
  description:
    "Delicious and nutritious confinement meals delivered to your doorstep in Singapore. Perfect for postpartum recovery!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      
      <body className= "flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1 pt-[80px]"> {children} </main>
        <Footer />
      </body>
    </html>
  );
}
