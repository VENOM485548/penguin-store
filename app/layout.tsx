import type { Metadata } from "next";
import { Urbanist } from "next/font/google";
import Script from "next/script";  // 👈 import Script
import "./globals.css";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import ModalProvider from "@/providers/modal-provider";
import ToastProvider from "@/providers/toast-provider";
import { ThemeProvider } from "@/providers/theme-provider";

const font = Urbanist({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Store",
  description: "Store",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={font.className}>
        <ThemeProvider attribute="class" defaultTheme="system"enableSystem disableTransitionOnChange>
          <ModalProvider />
          <ToastProvider />
          <Navbar />
          {children}
          <Footer />

          {/* Razorpay Checkout script */}
          <Script
            src="https://checkout.razorpay.com/v1/checkout.js"
            strategy="afterInteractive"
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
