import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";  // Global CSS styles

// Load fonts
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Root Layout component that wraps the entire app
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>My Next.js App</title>
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>

        {children}
      </body>
    </html>
  );
}