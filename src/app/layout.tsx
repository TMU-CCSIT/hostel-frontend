import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import RecoidContextProvider from "./recoilContextProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Tmu Hostel",
  description: "Tmu hostel leave issue",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <RecoidContextProvider>
          <Toaster />
          {children}
        </RecoidContextProvider>
      </body>
    </html>
  );
}




