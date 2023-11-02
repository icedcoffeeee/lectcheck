"use client";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useState } from "react";
import Link from "next/link";

export default function SearchByTag() {
  const [tag, setTag] = useState("");
  return (
    <div className="flex flex-col gap-2 my-3">
      <Input
        value={tag}
        onChange={(e) => setTag(e.target.value)}
        type="text"
        placeholder="Search by tag"
      />
      <Button>
        <Link href={"/" + tag}>Search</Link>
      </Button>
    </div>
  );
}
