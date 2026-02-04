import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "@/app/globals.css";

const geist = Geist({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Quoota - Portal Empresarial",
  description: "Gestiona los beneficios y recursos de tu empresa desde un solo lugar",
};

export const viewport = {
  themeColor: "#2d9d78",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`${geist.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}
