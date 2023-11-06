import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const comfortaa = Poppins({ weight: "400", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "UM Profs",
  description: "Rating UM Instructors",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={comfortaa.className + " m-10 md:flex md:justify-center"}>
        <div className="fixed top-0 left-0 -z-10 w-[100lvw] h-[100lvh] bg-gradient-to-br from-blue-800 to-black min-h-screen" />
        {children}
      </body>
    </html>
  );
}
