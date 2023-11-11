"use client";

import { GraduationCap } from "lucide-react";
import { Session } from "next-auth";
import { Plus_Jakarta_Sans } from "next/font/google";
import { UserButton } from "./userbutton";
import { useRouter } from "next/navigation";
import logo from "@/app/icon.svg";
import Image from "next/image";

const font = Plus_Jakarta_Sans({ weight: "400", subsets: ["latin"] });

export function NavBar({ session }: { session: Session | null }) {
  const router = useRouter();
  const goToHomepage = () => router.push("/");
  return (
    <div className="p-3 flex justify-between bg-blue-950 md:text-xl">
      <Image
        src={logo}
        height={24}
        width={24}
        alt="logo"
        className="cursor-pointer"
        onClick={goToHomepage}
      />
      <span
        className={font.className + " cursor-pointer"}
        onClick={goToHomepage}
      >
        LECTCHECK
      </span>
      <UserButton session={session} />
    </div>
  );
}
