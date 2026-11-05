import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Caphè Home Services",
  description: "Local service lead intake — powered by Caphè",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
