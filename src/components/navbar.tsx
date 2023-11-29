"use client";

import logo from "@/app/icon.svg";
import { Session } from "next-auth";
import { Plus_Jakarta_Sans } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { UserButton } from "./userbutton";

const font = Plus_Jakarta_Sans({ weight: "400", subsets: ["latin"] });

export function NavBar({ session }: { session: Session | null }) {
  return (
    <nav className="p-3 flex justify-between bg-blue-950 shadow-md md:text-xl">
      <Link href="/">
        <Image
          src={logo}
          height={24}
          width={24}
          alt="logo"
          className="cursor-pointer"
        />
      </Link>
      <Link href={"/"} className={font.className}>
        LECTCHECK
      </Link>
      <UserButton session={session} />
    </nav>
  );
}
