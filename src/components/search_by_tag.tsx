"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Add } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { Search, X } from "lucide-react";
import { CustomRating } from "@/components/ui/rating";
import { Divider } from "@mui/material";
import { Textarea } from "@/components/ui/textarea";
import { useFormState, useFormStatus } from "react-dom";
import { addReviewDB } from "@/app/actions";

export default function SearchByTag() {
  const router = useRouter();
  return (
    <form
      action={(e) => {
        let tag = e.get("tag")?.toString();
        router.push(tag ?? "");
      }}
      className="flex gap-2 mb-3 text-black"
    >
      <Input name="tag" type="text" placeholder="Search by tag" />
      <Button name="submit">
        <Search />
      </Button>
    </form>
  );
}

interface AddReviewProps {
  lectTag: string;
}
export function AddReview({ lectTag }: AddReviewProps) {
  const [open, setOpen] = useState(false);

  const close = () => {
    const animElems = Array.from(document.getElementsByClassName("animate-in"));
    animElems.map((e) => e.classList.replace("animate-in", "animate-out"));
    window.setTimeout(() => setOpen(false), 125); // a little bit shorter than the animation (150ms)
  };

  useEffect(() => {
    window.onkeydown = (e) => {
      if (e.key === "Escape") close();
    };
  }, []);

  return (
    <div>
      <button
        onClick={() => setOpen(true)}
        className="bg-blue-600 rounded-md w-fit h-fit"
      >
        <Add sx={{ color: "white" }} />
      </button>
      {open ? (
        <div
          onClick={close}
          className="fixed flex justify-center items-center left-0 top-0 bg-black/20 backdrop-blur-sm w-full h-full animate-in fade-in-50 fade-out-50"
        >
          <div
            onClick={(e) => {
              e.stopPropagation();
            }}
            className="relative px-5 py-10 z-50 w-full h-fit bg-white mx-5 rounded-md border border-gray-400 shadow-lg animate-in zoom-in-75 zoom-out-75 max-w-xl"
          >
            <X onClick={close} className="absolute top-5 right-5" />
            <h2 className="text-black font-bold">Add Review</h2>
            <p>
              Make sure your review is fair and unbiased. Other people will see
              and depend on them.
            </p>
            <Divider sx={{ my: 1.5, borderColor: "black" }} />
            <AddReviewForm tag={lectTag} close={close} />
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

function AddReviewForm({ tag, close }: { tag: string; close: () => void }) {
  const [ass, setAss] = useState(0);
  const [tea, setTea] = useState(0);
  const [state, formAction] = useFormState(addReviewDB, {
    message: "",
    success: false,
  });
  useEffect(() => {
    if (state.success === true) close();
    state.message = "";
    state.success = false;
  }, [state, close]);
  return (
    <form action={formAction} className="flex flex-col gap-3">
      <input name="lecturerTag" value={tag} hidden />
      <CustomRating
        label="Quality of Teaching"
        name="teaching"
        value={tea}
        onChange={(_e, v) => {
          if (v !== null) setTea(v);
        }}
        sizeInd={2}
        editable
      />
      <CustomRating
        label="Assignments"
        name="assignments"
        value={ass}
        onChange={(_e, v) => {
          if (v !== null) setAss(v);
        }}
        sizeInd={2}
        editable
      />
      <p className="text-xl">Course Code:</p>
      <Input name="kelas" placeholder="SIF2021" className="border-black" />
      <p className="text-xl">Comment:</p>
      <Textarea
        name="comments"
        className="border-black"
        placeholder="(Optional)"
      />
      <Button name="submit" disabled={useFormStatus().pending}>
        Submit
      </Button>
      <p className="text-blue-700">{state.message}</p>
    </form>
  );
}
