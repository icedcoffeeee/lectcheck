"use client";

import { Search } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Alert, Snackbar } from "@mui/material";

export function TagSearchBar() {
  // const [pressed, setPressed] = useOptimistic(
  //   false,
  //   (_, value: boolean) => value
  // );
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  return (
    <form
      action={(data) => {
        const tag = (data.get("tag") as string)
          .toLowerCase()
          .replaceAll(".", "-");
        // setPressed(!!tag.length);
        if (!tag.includes(" ")) router.push(tag);
        else setError("Tag must not include a space.");
      }}
      className="flex gap-2"
    >
      <Input name="tag" placeholder="Search by lecturer tag" />
      <span>
        <Button name="submit">
          <Search />
        </Button>
      </span>
      <Snackbar
        open={error !== null}
        autoHideDuration={5000}
        onClose={() => setError(null)}
      >
        <Alert severity="error" variant="filled">
          {error}
        </Alert>
      </Snackbar>
    </form>
  );
}
