import type { Metadata } from "next";
import { Almarai } from "next/font/google";
import "./globals.css";

// Import Almarai font
const almarai = Almarai({ weight: "400", subsets: ["arabic"] });

export const metadata: Metadata = {
  title: "MOI QR Verification",
  description: "MOI QR Verification",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <head>
        <link rel="icon" href="/favicon.png" type="image/png" />
      </head>
      <body className={`${almarai.className} antialiased`}>{children}</body>
    </html>
  );
}
