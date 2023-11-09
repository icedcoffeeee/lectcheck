"use client";

import { Button, ButtonGroup, Popover } from "@mui/material";
import { User } from "lucide-react";
import { Session } from "next-auth";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

type User =
  | {
      name?: string | null | undefined;
      email?: string | null | undefined;
      image?: string | null | undefined;
    }
  | undefined;

export function UserButton({ session }: { session: Session | null }) {
  const [anchorElem, setAnchorElem] = useState<HTMLElement | null>(null);
  const router = useRouter();
  return (
    <>
      {session ? (
        <Image
          src={session.user?.image ?? ""}
          width={24}
          height={24}
          alt={""}
          className="object-cover rounded-full cursor-pointer"
          onClick={(e) => setAnchorElem(e.currentTarget)}
        />
      ) : (
        <span
          onClick={(e) => setAnchorElem(e.currentTarget)}
          className="cursor-pointer"
        >
          <User />
        </span>
      )}
      <Popover
        open={anchorElem !== null}
        onClose={() => setAnchorElem(null)}
        anchorEl={anchorElem}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        sx={{ margin: 1, width: "100%" }}
      >
        <ButtonGroup
          orientation="vertical"
          aria-label="vertical outlined button group"
        >
          <Button
            className="bg-blue-950 text-white border-0 hover:bg-blue-800"
            onClick={() =>
              router.push(`/api/auth/${session ? "signout" : "signin"}/google`)
            }
          >
            {session ? "Log Out" : "Log In"}
          </Button>
        </ButtonGroup>
      </Popover>
    </>
  );
}
