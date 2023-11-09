"use client";

import {
  Alert,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Rating,
  Snackbar,
} from "@mui/material";
import { Plus } from "lucide-react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Session } from "next-auth";
import { Input, Textarea } from "./ui/input";
import { Button } from "./ui/button";
import { useFormState } from "react-dom";
import { addReview } from "@/utils/adddeletereview";
import { RUBRICS } from "./reviewslist";

export function AddReviewButton({
  tag,
  session,
}: {
  tag: string;
  session: Session | null;
}) {
  let states = useState(Array(RUBRICS.length).fill(0));
  const [open, setOpen] = useState(false);
  return (
    <span>
      <button
        className="aspect-square h-full bg-blue-500 p-1 rounded-md"
        onClick={() => setOpen(true)}
      >
        <Plus size={20} />
      </button>
      {session ? (
        <Dialog
          open={open}
          onClose={() => {
            setOpen(false);
            states[1](Array(RUBRICS.length).fill(0));
          }}
          className="rounded-md"
        >
          <DialogTitle className="text-black">Add Review</DialogTitle>
          <DialogContent className=" text-black">
            Make sure your review is fair and unbiased. Other people will see
            and depend on them.
            <Divider sx={{ my: 1.5, borderColor: "#222" }} />
            <AddReviewForm
              tag={tag}
              session={session}
              states={states}
              setDialogState={setOpen}
            />
          </DialogContent>
        </Dialog>
      ) : (
        <ErrorSnackbar state={[open, setOpen]} intent="leave a review" />
      )}
    </span>
  );
}

function AddReviewForm({
  tag,
  session,
  states,
  setDialogState,
}: {
  tag: string;
  session: Session;
  states: [number[], Dispatch<SetStateAction<number[]>>];
  setDialogState: Dispatch<SetStateAction<boolean>>;
}) {
  const [status, formAction] = useFormState(addReview, {
    message: [],
    success: false,
  });
  useEffect(() => {
    if (status.success) setDialogState(false);
  }, [status, setDialogState]);
  return (
    <form action={formAction} className="flex flex-col gap-2">
      <input name="tag" value={tag} hidden />
      <input
        name="authorId"
        value={session.user?.email?.split("@")[0]}
        hidden
      />
      {RUBRICS.map((R, n) => {
        return (
          <div className="flex justify-between" key={n}>
            <p>{R[0]}</p>
            <Rating
              name={R[0]}
              value={states[0][n]}
              onChange={(_e, v) => {
                if (v !== null) {
                  states[1](
                    states[0].map((r, m) => {
                      if (m === n) {
                        r = v;
                      }
                      return r;
                    })
                  );
                }
              }}
            />
          </div>
        );
      })}
      <p>Course Code:</p>
      <Input name="kelas" placeholder="SIF2021" />
      <p>Comment:</p>
      <Textarea name="comments" placeholder="(Optional)" />
      <Button name="submit">Submit</Button>
      {!status.success ? (
        status.message.map((m) => (
          <p className="text-blue-700" key={m}>
            {m}
          </p>
        ))
      ) : (
        <></>
      )}
    </form>
  );
}

export function ErrorSnackbar({
  state,
  intent,
}: {
  state: [boolean, Dispatch<SetStateAction<boolean>>];
  intent: string;
}) {
  return (
    <Snackbar
      open={state[0]}
      onClose={() => state[1](false)}
      autoHideDuration={5000}
    >
      <Alert severity="error" variant="filled">
        You must log in to {intent}.
      </Alert>
    </Snackbar>
  );
}
