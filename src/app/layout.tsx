import type { Metadata } from "next";
import { Poppins as Font } from "next/font/google";
import "./globals.css";
import { NavBar } from "@/components/navbar";
import { Dot } from "lucide-react";
import { getServerSession } from "next-auth";
import { options } from "./api/auth/[...nextauth]/options";

const font = Font({ weight: "400", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LectCheck",
  description: "Rate your UM Lecturers",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(options);
  return (
    <html lang="en">
      <body className={font.className + " flex flex-col w-screen min-h-screen"}>
        <div className="fixed top-0 left-0 min-h-screen w-screen bg-gradient-to-br from-blue-700 to-black -z-20" />
        <NavBar session={session} />
        <div className="grow m-3 md:flex md:justify-center">{children}</div>
        <div className="w-screen flex py-5 justify-center items-center text-xs">
          <span>copyright (c) 2023</span>
          <Dot />
          <span>icedcoffeeee</span>
        </div>
      </body>
    </html>
  );
}
