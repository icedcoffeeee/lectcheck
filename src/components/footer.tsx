import { Dot } from "lucide-react";
import Link from "next/link";
import { PropsWithChildren } from "react";

export function Footer() {
  return (
    <div className="w-full py-5 text-xs flex flex-col">
      <div className="flex justify-center items-center">
        <span>copyright (c) 2023</span>
        <Dot />
        <span>icedcoffeeee</span>
      </div>
      <div className="flex justify-center items-center">
        <ULButton nav="/privacy">privacy</ULButton>
        <Dot />
        <ULButton nav="/tos">terms of service</ULButton>
      </div>
    </div>
  );
}

function ULButton({ nav, children }: { nav: string } & PropsWithChildren) {
  return (
    <Link href={nav} className="hover:underline hover:cursor-pointer">
      {children}
    </Link>
  );
}
