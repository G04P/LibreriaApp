"use client";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { ThemeProvider } from "next-themes";
import { Inter } from "next/font/google";
import "@/styles/compiled/global.css";
import { useEffect, useState } from "react";
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  const [mounted , setMounted] = useState(false);
  useEffect(() => {
    setMounted(true)
  } ,[])
  if (!mounted) {
    return <>{children}</>
  }
  return (
    <html lang="en" className={inter.className}>
      <head>
        <title>Online Library</title>
        <meta name="description" content="Explore a vast collection of books in our online library." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
       <ThemeProvider >
        <Navbar />
        <main>{children}</main>
        <Footer />
      </ThemeProvider>
      </body>
    </html>
  );
}
